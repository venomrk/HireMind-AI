# HireMind AI Backend

FastAPI backend for AI-powered recruitment platform.

## Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/hiremind
JWT_SECRET=your-super-secret-key
GEMINI_API_KEY=your-gemini-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

## API Documentation

Visit `http://localhost:8000/docs` for Swagger UI.
