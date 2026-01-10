# HireMind AI - Product Requirements Document (PRD)

## 1. Executive Summary
HireMind AI is an automated AI recruiter designed to streamline the hiring process for SMBs and staffing agencies. It automates resume screening, candidate ranking, and initial outreach, reducing time-to-hire by 70%.

## 2. User Roles
- **Admin (Recruiter/Employer):** Creates jobs, views ranked candidates, manages subscription, invites team members.
- **Candidate:** (Passive role) Applies via email/LinkedIn, receives AI-generated status updates.
- **System (AI Agent):** Parses resumes, scores candidates, sends emails.

## 3. Features & Scope
### MVP (Phase 1 - Days 1-15)
- **Job Management:** Create, Edit, Close job posts.
- **Resume Parsing:** Upload PDF/Docx, extract skills, exp, education.
- **AI Ranking:** Score candidates (0-100) match against job description.
- **Email Automation:** Auto-send "Received", "Shortlisted", "Rejected" emails.
- **Dashboard:** Simple table view of candidates with scores.

### Phase 2 (Future)
- **LinkedIn Integration:** Auto-import profiles.
- **Interview Scheduling:** Calendly integration.
- **Voice Agent:** AI phone screen.
- **Multi-tenant Agency Mode:** Manage multiple clients.

## 4. Monetization Strategy
- **Free Tier:** 1 Job, 50 resumes/mo.
- **Pro ($99/mo):** 5 Jobs, 500 resumes/mo, Custom Email Templates.
- **Business ($299/mo):** 20 Jobs, Unlimited resumes, Team access.

## 5. Functional Requirements
- **Auth:** Email/Password + Google OAuth (NextAuth).
- **Database:** PostgreSQL (Supabase) for Jobs, Candidates, Users.
- **Storage:** S3/Supabase Storage for resume files.
- **AI Engine:** Gemini 1.5 Flash (via API) for resume analysis.
- **Payments:** Stripe Checkout for subscriptions.

## 6. Non-Functional Requirements
- **Performance:** Resume parsing < 3 seconds.
- **Security:** Encrypted PII (Personally Identifiable Information).
- **Scalability:** Handle 10,000 resumes/day.
- **Availability:** 99.9% uptime.

## 7. Success Metrics
- **Activation:** % of signups who post a job.
- **Retention:** % of users who renew subscription.
- **Efficiency:** Average time saved per hire (Target: 10 hours).
