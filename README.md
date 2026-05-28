# VedaAI — AI Assessment Creator

An AI-powered assessment generation platform that enables educators to create structured, professional question papers with intelligent question generation, real-time processing feedback, and PDF export.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                     │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Create   │  │ Assignments  │  │  Result / Output   │  │
│  │ Form     │  │ List (API)   │  │  (QuestionPaper)   │  │
│  └────┬─────┘  └──────┬───────┘  └────────┬──────────┘  │
│       │               │                   │              │
│  ┌────┴───────────────┴───────────────────┴──────────┐  │
│  │          Zustand Store + WebSocket Hook            │  │
│  └───────────────────────┬───────────────────────────┘  │
└──────────────────────────┼──────────────────────────────┘
                           │ HTTP + WebSocket
┌──────────────────────────┼──────────────────────────────┐
│                    Backend (Express)                      │
│  ┌───────────┐  ┌────────┴────────┐  ┌───────────────┐  │
│  │  REST API │  │  Socket.IO      │  │  PDF Service   │  │
│  │  Routes   │  │  (Real-time)    │  │  (Puppeteer)   │  │
│  └─────┬─────┘  └────────┬────────┘  └───────────────┘  │
│        │                 │                                │
│  ┌─────┴─────────────────┴──────────────────────────┐   │
│  │              BullMQ Job Queue                     │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │  Generation Worker                          │  │   │
│  │  │  1. Fetch assignment from MongoDB           │  │   │
│  │  │  2. Build structured prompt                 │  │   │
│  │  │  3. Call Claude API                         │  │   │
│  │  │  4. Parse + validate JSON response          │  │   │
│  │  │  5. Store QuestionPaper in MongoDB          │  │   │
│  │  │  6. Broadcast completion via WebSocket      │  │   │
│  │  └─────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────┘   │
│        │                                                  │
│  ┌─────┴──────────┐  ┌───────────────┐                   │
│  │   MongoDB      │  │    Redis       │                   │
│  │  (Assignments  │  │  (Job Queue    │                   │
│  │   + Results)   │  │   State)       │                   │
│  └────────────────┘  └───────────────┘                   │
└──────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, TypeScript, Zustand, Socket.IO Client, Tailwind CSS |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | MongoDB (Mongoose ODM) |
| **Queue** | BullMQ + Redis |
| **AI** | Anthropic Claude (structured JSON prompting) |
| **Real-time** | Socket.IO (WebSocket) |
| **PDF** | Puppeteer (server-side rendering) |

## Approach

### 1. Assignment Creation
The frontend form collects assignment parameters. State is managed via Zustand. On submit, data is sent to the Express API.

### 2. Background Processing
The API creates an `Assignment` in MongoDB and enqueues a BullMQ job. The worker:
- Builds a structured prompt and calls the LLM.
- Parses the JSON response and stores the `QuestionPaper`.
- Broadcasts real-time status updates via Socket.IO.

### 3. Output Display
Generated papers are rendered with structured sections and can be exported as A4 PDFs.

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Redis (local or Docker)
- Anthropic API key (optional — mock generation works without it)

### 1. Clone & Install

```bash
git clone <repo-url>
cd VedaAI

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Variables

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/ai-assessment
REDIS_URL=redis://localhost:6379
AI_PROVIDER=auto                  # auto | anthropic | groq | openai-compatible
ANTHROPIC_API_KEY=               # Claude key if using Anthropic
GROQ_API_KEY=                    # Groq API key if using Groq
AI_MODEL=claude-3-5-sonnet-20241022
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_MODEL=llama-3.3-70b-versatile
LLM_BASE_URL=                    # Any OpenAI-compatible endpoint (GPT, OpenRouter, LM Studio, Ollama-compatible)
LLM_API_KEY=                     # Token for the OpenAI-compatible endpoint
LLM_MODEL=                       # Model name for the OpenAI-compatible endpoint
AI_ALLOW_MOCK=false              # Keep false to avoid mock papers; true only for local fallback testing
```

### 3. Start Services

```bash
# Start Redis (Docker)
docker run -d --name vedaai-redis -p 6379:6379 redis:7-alpine

# Start MongoDB (if not running as service)
mongod --dbpath /data/db

# Start Backend
cd backend
npm run dev        # Runs on http://localhost:4000

# Start Frontend
cd frontend
npm run dev        # Runs on http://localhost:3000
```

### 4. Usage

1. Open `http://localhost:3000`
2. Click **Create Assignment** in sidebar
3. Fill in title, subject, upload material, set due date
4. Configure question types and counts
5. Click **Continue** to generate
6. View the structured question paper on the result page
7. Download as PDF

If no LLM credentials are configured, generation fails with a clear setup error unless `AI_ALLOW_MOCK=true` is enabled for local testing.

## Project Structure

```
VedaAI/
├── backend/
│   └── src/
│       ├── config/              # Environment and DB configs
│       ├── controllers/         # API business logic
│       ├── middleware/          # Global error handling
│       ├── models/              # Mongoose schemas
│       ├── routes/              # Express endpoint mappings
│       ├── queues/              # BullMQ queue setup
│       ├── workers/             # Background job processor
│       ├── services/            # AI, PDF, and Prompt services
│       └── websocket/           # Socket.IO real-time server
├── frontend/
│   └── src/
│       ├── app/                 # Next.js pages (App Router)
│       ├── components/          # Reusable UI components
│       │   └── assignment/      # Modular form components
│       ├── constants/           # Static config values
│       ├── hooks/               # Custom React hooks
│       ├── store/               # Zustand global state
│       └── services/            # API client layer
└── README.md
```

## Key Design Decisions

- **BullMQ over simple async**: AI generation can take 10-30s. Background processing prevents request timeouts and enables retry logic.
- **Structured JSON prompting**: The LLM is instructed to return strict JSON with a defined schema. The response is parsed, validated, and normalized before storage — never rendered raw.
- **Socket.IO rooms**: Each assignment gets its own room, so status updates are scoped and don't leak between users.
- **Zustand over Redux**: Lighter footprint, simpler API, sufficient for this app's state complexity.
- **Puppeteer PDF**: Server-side rendering ensures consistent PDF output across browsers with proper A4 formatting.
