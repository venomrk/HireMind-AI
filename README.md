# HireMind AI

AI-Powered Recruitment Platform by RKO Labs.

## Features

- 🤖 **AI Resume Screening** - Automatically parse and analyze resumes using Gemini AI
- 📊 **Smart Ranking** - Candidates scored and ranked by match percentage
- 📧 **Automated Emails** - Send status updates to candidates automatically
- 💳 **Subscription Plans** - Free, Pro ($99/mo), and Business ($299/mo) tiers
- 🎨 **Premium UI** - Dark mode, glassmorphism, modern design

## Tech Stack

### Backend
- **FastAPI** - Python async web framework
- **PostgreSQL** - Database (via Supabase)
- **SQLAlchemy** - ORM
- **Gemini AI** - Resume analysis
- **Stripe** - Payment processing

### Frontend
- **Next.js 14** - React framework
- **TailwindCSS** - Styling
- **React Query** - Data fetching
- **Zustand** - State management

## Project Structure

```
HireMind AI/
├── backend/
│   ├── main.py           # FastAPI app
│   ├── config.py         # Settings
│   ├── database.py       # DB connection
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── auth.py           # JWT authentication
│   ├── routes/           # API routes
│   │   ├── auth.py
│   │   ├── jobs.py
│   │   └── candidates.py
│   └── services/         # Business logic
│       ├── ai.py
│       └── stripe_service.py
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js pages
│   │   └── lib/          # Utils & API client
│   └── package.json
└── README.md
```

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Create .env file with:
# DATABASE_URL=your-postgres-url
# JWT_SECRET=your-secret
# GEMINI_API_KEY=your-key

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login and get token |
| GET | /jobs | List all jobs |
| POST | /jobs | Create a job |
| GET | /jobs/{id} | Get job details |
| POST | /candidates/job/{id}/upload | Upload resume |
| PUT | /candidates/{id}/status | Update status |

## License

© 2024 RKO Labs. All rights reserved.
