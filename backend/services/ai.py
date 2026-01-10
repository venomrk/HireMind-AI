import google.generativeai as genai
from config import get_settings
import json
import re

settings = get_settings()

if settings.gemini_api_key:
    genai.configure(api_key=settings.gemini_api_key)

async def analyze_resume(resume_text: str, job_description: str, required_skills: list[str]) -> dict:
    """Analyze a resume against a job description using Gemini AI."""
    
    if not settings.gemini_api_key:
        # Return mock data if no API key
        return {
            "score": 75,
            "summary": "Strong candidate with relevant experience.",
            "skills_matched": required_skills[:3] if required_skills else ["Python", "JavaScript"],
            "experience_years": 5,
            "strengths": ["Good technical background", "Relevant industry experience"],
            "concerns": ["May need training on specific tools"]
        }
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""You are an expert HR recruiter AI. Analyze the following resume against the job description.

JOB DESCRIPTION:
{job_description}

REQUIRED SKILLS:
{', '.join(required_skills) if required_skills else 'Not specified'}

RESUME:
{resume_text}

Provide your analysis in the following JSON format ONLY (no other text):
{{
    "score": <0-100 integer representing match percentage>,
    "summary": "<2-3 sentence summary of the candidate>",
    "skills_matched": ["<list of skills from required that candidate has>"],
    "experience_years": <estimated years of relevant experience>,
    "strengths": ["<3-5 key strengths>"],
    "concerns": ["<any red flags or areas of concern>"]
}}
"""
    
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Extract JSON from response
        json_match = re.search(r'\{[\s\S]*\}', text)
        if json_match:
            return json.loads(json_match.group())
        
        return {
            "score": 50,
            "summary": "Unable to fully analyze resume.",
            "skills_matched": [],
            "experience_years": 0,
            "strengths": [],
            "concerns": ["AI analysis incomplete"]
        }
    except Exception as e:
        print(f"AI Analysis error: {e}")
        return {
            "score": 50,
            "summary": "Error during analysis.",
            "skills_matched": [],
            "experience_years": 0,
            "strengths": [],
            "concerns": [str(e)]
        }

async def generate_job_description(title: str, skills: list[str]) -> str:
    """Generate a job description using AI."""
    
    if not settings.gemini_api_key:
        return f"We are looking for a talented {title} to join our team. The ideal candidate will have experience with {', '.join(skills) if skills else 'relevant technologies'}."
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""Generate a professional job description for the following role:

Title: {title}
Required Skills: {', '.join(skills) if skills else 'To be determined'}

Write a compelling 2-3 paragraph job description that includes:
1. Role overview
2. Key responsibilities
3. Required qualifications

Keep it concise and professional."""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"We are looking for a talented {title} to join our team."

async def generate_candidate_email(candidate_name: str, status: str, job_title: str) -> dict:
    """Generate an email for a candidate based on their status."""
    
    templates = {
        "received": {
            "subject": f"Application Received - {job_title}",
            "body": f"Dear {candidate_name},\n\nThank you for applying for the {job_title} position. We have received your application and our team is reviewing it carefully.\n\nWe will be in touch soon regarding next steps.\n\nBest regards,\nThe Hiring Team"
        },
        "shortlisted": {
            "subject": f"Great News! You've Been Shortlisted - {job_title}",
            "body": f"Dear {candidate_name},\n\nWe are pleased to inform you that you have been shortlisted for the {job_title} position!\n\nOur team was impressed with your qualifications. We will reach out shortly to schedule an interview.\n\nBest regards,\nThe Hiring Team"
        },
        "rejected": {
            "subject": f"Application Update - {job_title}",
            "body": f"Dear {candidate_name},\n\nThank you for your interest in the {job_title} position. After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.\n\nWe appreciate your time and wish you success in your job search.\n\nBest regards,\nThe Hiring Team"
        }
    }
    
    return templates.get(status, templates["received"])
