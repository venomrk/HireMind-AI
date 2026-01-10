from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from uuid import UUID

# Auth Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    company_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID
    email: str
    full_name: Optional[str]
    company_name: Optional[str]
    role: str
    subscription_tier: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Job Schemas
class JobCreate(BaseModel):
    title: str
    description: Optional[str] = None
    requirements: Optional[str] = None
    skills: Optional[List[str]] = []
    location: Optional[str] = None
    salary_range: Optional[str] = None
    job_type: Optional[str] = "full-time"

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    skills: Optional[List[str]] = None
    location: Optional[str] = None
    salary_range: Optional[str] = None
    job_type: Optional[str] = None
    status: Optional[str] = None

class JobResponse(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str]
    requirements: Optional[str]
    skills: Optional[List[str]]
    location: Optional[str]
    salary_range: Optional[str]
    job_type: str
    status: str
    created_at: datetime
    candidate_count: Optional[int] = 0

    class Config:
        from_attributes = True

# Candidate Schemas
class CandidateCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None

class CandidateResponse(BaseModel):
    id: UUID
    job_id: UUID
    name: str
    email: str
    phone: Optional[str]
    resume_url: Optional[str]
    ai_score: int
    ai_summary: Optional[str]
    skills_matched: Optional[List[str]]
    experience_years: Optional[int]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class CandidateUpdateStatus(BaseModel):
    status: str  # new, reviewing, shortlisted, rejected, hired

# AI Analysis Response
class AIAnalysisResponse(BaseModel):
    score: int
    summary: str
    skills_matched: List[str]
    experience_years: int
    strengths: List[str]
    concerns: List[str]

# Dashboard Stats
class DashboardStats(BaseModel):
    total_jobs: int
    active_jobs: int
    total_candidates: int
    shortlisted: int
    avg_score: float

# Subscription
class SubscriptionCreate(BaseModel):
    plan: str
    stripe_subscription_id: str
