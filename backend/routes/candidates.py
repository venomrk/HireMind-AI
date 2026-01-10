from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from uuid import UUID
import aiofiles
import os
from database import get_db
from models import User, Job, Candidate
from schemas import CandidateCreate, CandidateResponse, CandidateUpdateStatus, AIAnalysisResponse
from auth import get_current_user
from services.ai import analyze_resume
import PyPDF2
from io import BytesIO

router = APIRouter(prefix="/candidates", tags=["Candidates"])

UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from a PDF file."""
    try:
        pdf_reader = PyPDF2.PdfReader(BytesIO(file_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        return ""

@router.get("/job/{job_id}", response_model=List[CandidateResponse])
async def get_candidates(
    job_id: UUID,
    status_filter: str = None,
    sort_by: str = "ai_score",
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all candidates for a job, sorted by AI score."""
    # Verify job ownership
    job_result = await db.execute(
        select(Job).where(Job.id == job_id, Job.user_id == current_user.id)
    )
    if not job_result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Job not found")
    
    query = select(Candidate).where(Candidate.job_id == job_id)
    if status_filter:
        query = query.where(Candidate.status == status_filter)
    
    if sort_by == "ai_score":
        query = query.order_by(Candidate.ai_score.desc())
    else:
        query = query.order_by(Candidate.created_at.desc())
    
    result = await db.execute(query)
    candidates = result.scalars().all()
    
    return [CandidateResponse.model_validate(c) for c in candidates]

@router.post("/job/{job_id}/upload", response_model=CandidateResponse)
async def upload_resume(
    job_id: UUID,
    name: str,
    email: str,
    phone: str = None,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Upload a resume and create a candidate with AI analysis."""
    # Verify job ownership
    job_result = await db.execute(
        select(Job).where(Job.id == job_id, Job.user_id == current_user.id)
    )
    job = job_result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Read file content
    file_content = await file.read()
    
    # Save file
    file_path = f"{UPLOAD_DIR}/{job_id}_{email.replace('@', '_')}_{file.filename}"
    async with aiofiles.open(file_path, 'wb') as f:
        await f.write(file_content)
    
    # Extract text from resume
    resume_text = ""
    if file.filename.lower().endswith('.pdf'):
        resume_text = await extract_text_from_pdf(file_content)
    else:
        resume_text = file_content.decode('utf-8', errors='ignore')
    
    # AI Analysis
    analysis = await analyze_resume(
        resume_text,
        job.description or "",
        job.skills or []
    )
    
    # Create candidate
    candidate = Candidate(
        job_id=job_id,
        name=name,
        email=email,
        phone=phone,
        resume_url=file_path,
        resume_text=resume_text,
        ai_score=analysis["score"],
        ai_summary=analysis["summary"],
        skills_matched=analysis["skills_matched"],
        experience_years=analysis["experience_years"]
    )
    db.add(candidate)
    await db.commit()
    await db.refresh(candidate)
    
    return CandidateResponse.model_validate(candidate)

@router.get("/{candidate_id}", response_model=CandidateResponse)
async def get_candidate(
    candidate_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific candidate."""
    result = await db.execute(
        select(Candidate).join(Job).where(
            Candidate.id == candidate_id,
            Job.user_id == current_user.id
        )
    )
    candidate = result.scalar_one_or_none()
    
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    return CandidateResponse.model_validate(candidate)

@router.put("/{candidate_id}/status", response_model=CandidateResponse)
async def update_candidate_status(
    candidate_id: UUID,
    status_update: CandidateUpdateStatus,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update candidate status (new, reviewing, shortlisted, rejected, hired)."""
    result = await db.execute(
        select(Candidate).join(Job).where(
            Candidate.id == candidate_id,
            Job.user_id == current_user.id
        )
    )
    candidate = result.scalar_one_or_none()
    
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    candidate.status = status_update.status
    await db.commit()
    await db.refresh(candidate)
    
    return CandidateResponse.model_validate(candidate)

@router.post("/{candidate_id}/reanalyze", response_model=AIAnalysisResponse)
async def reanalyze_candidate(
    candidate_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Re-run AI analysis on a candidate."""
    result = await db.execute(
        select(Candidate).join(Job).where(
            Candidate.id == candidate_id,
            Job.user_id == current_user.id
        )
    )
    candidate = result.scalar_one_or_none()
    
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    job_result = await db.execute(select(Job).where(Job.id == candidate.job_id))
    job = job_result.scalar_one()
    
    analysis = await analyze_resume(
        candidate.resume_text or "",
        job.description or "",
        job.skills or []
    )
    
    # Update candidate
    candidate.ai_score = analysis["score"]
    candidate.ai_summary = analysis["summary"]
    candidate.skills_matched = analysis["skills_matched"]
    candidate.experience_years = analysis["experience_years"]
    
    await db.commit()
    
    return AIAnalysisResponse(**analysis)

@router.delete("/{candidate_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_candidate(
    candidate_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a candidate."""
    result = await db.execute(
        select(Candidate).join(Job).where(
            Candidate.id == candidate_id,
            Job.user_id == current_user.id
        )
    )
    candidate = result.scalar_one_or_none()
    
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    await db.delete(candidate)
    await db.commit()
