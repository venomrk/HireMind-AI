# HireMind AI - UI/UX Design System & User Flows

## 1. Design Philosophy
Clean, professional, and trustworthy. A mix of "HR Tech" (Blue/Teal) with "AI Modernity" (Purple/Gradient). Glassmorphism for cards, sharp borders for inputs.

## 2. Color System
### Primary Palette
- **Brand Blue:** `#2563EB` (Buttons, Links, Active States)
- **AI Purple:** `#7C3AED` (AI Features, Rankings, Magic Actions)
- **Success Green:** `#10B981` (High Match, Approved)
- **Warning Yellow:** `#F59E0B` (Medium Match, Action Needed)
- **Error Red:** `#EF4444` (Low Match, Rejected)

### Neutral Palette (Dark Mode First)
- **Background:** `#0F172A` (Slate 900)
- **Surface:** `#1E293B` (Slate 800)
- **Border:** `#334155` (Slate 700)
- **Text Main:** `#F8FAFC` (Slate 50)
- **Text Muted:** `#94A3B8` (Slate 400)

## 3. Typography
**Font:** Inter (Google Fonts)
- **H1:** 32px, Bold, Tracking -0.02em
- **H2:** 24px, SemiBold
- **H3:** 20px, Medium
- **Body:** 16px, Regular, Line-height 1.5
- **Small:** 14px, Regular

## 4. Components
### Card (Candidate Profile)
- Background: Surface (`#1E293B`)
- Border: 1px Solid (`#334155`)
- Radius: 12px
- Content: Avatar, Name, Role, "Match Score" gauge (top right).

### AI Badge
- Gradient Background: `linear-gradient(135deg, #2563EB, #7C3AED)`
- Text: White, 12px, Bold
- Icon: Sparkles

## 5. User Flows
### Flow A: Post a Job
1.  **Dashboard:** Click "New Job" (Primary Button).
2.  **Job Form:** Enter Title, Description, Skills.
    *   *AI Feature:* "Auto-complete Description" button.
3.  **Review:** See preview of job post.
4.  **Success:** "Job Posted! Waiting for applicants..."

### Flow B: Review Candidates (The Core Loop)
1.  **Job Dashboard:** Click on active job "Senior React Dev" (Badge: 5 New Candidates).
2.  **Candidate List:** Sorted by "AI Score" (High to Low).
3.  **Quick View:** Click candidate row -> Slide-over panel appears.
    *   Shows: Summary, Skills Match, Experience.
    *   Actions: "Shortlist", "Reject", "Email".
4.  **AI Analysis:** Click "Ask AI" tab -> Chat interface "Why is this candidate a good fit?"

## 6. Dashboards
### Recruiter Dashboard
- **Top Bar:** Stats (Open Jobs, Total Candidates, Interviews Scheduled).
- **Recent Activity:** Feed of new applicants.
- **Jobs Grid:** Cards for each active job with mini-sparkline of applicant velocity.
