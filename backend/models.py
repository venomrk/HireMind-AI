from sqlalchemy import Column, String, Text, Integer, ARRAY, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255))
    company_name = Column(String(255))
    role = Column(String(50), default="recruiter")
    subscription_tier = Column(String(50), default="free")
    stripe_customer_id = Column(String(255))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    
    jobs = relationship("Job", back_populates="user", cascade="all, delete-orphan")
    email_templates = relationship("EmailTemplate", back_populates="user", cascade="all, delete-orphan")
    subscription = relationship("Subscription", back_populates="user", uselist=False)

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    requirements = Column(Text)
    skills = Column(ARRAY(Text))
    location = Column(String(255))
    salary_range = Column(String(100))
    job_type = Column(String(50), default="full-time")
    status = Column(String(50), default="active", index=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    
    user = relationship("User", back_populates="jobs")
    candidates = relationship("Candidate", back_populates="job", cascade="all, delete-orphan")

class Candidate(Base):
    __tablename__ = "candidates"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_id = Column(UUID(as_uuid=True), ForeignKey("jobs.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50))
    resume_url = Column(Text)
    resume_text = Column(Text)
    ai_score = Column(Integer, default=0, index=True)
    ai_summary = Column(Text)
    skills_matched = Column(ARRAY(Text))
    experience_years = Column(Integer)
    status = Column(String(50), default="new", index=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    
    job = relationship("Job", back_populates="candidates")
    email_logs = relationship("EmailLog", back_populates="candidate", cascade="all, delete-orphan")

class EmailTemplate(Base):
    __tablename__ = "email_templates"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    template_type = Column(String(50))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="email_templates")

class EmailLog(Base):
    __tablename__ = "email_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("candidates.id", ondelete="CASCADE"))
    template_id = Column(UUID(as_uuid=True), ForeignKey("email_templates.id"))
    sent_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    status = Column(String(50), default="sent")
    
    candidate = relationship("Candidate", back_populates="email_logs")

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    stripe_subscription_id = Column(String(255))
    plan = Column(String(50), nullable=False)
    status = Column(String(50), default="active")
    current_period_start = Column(TIMESTAMP(timezone=True))
    current_period_end = Column(TIMESTAMP(timezone=True))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="subscription")
