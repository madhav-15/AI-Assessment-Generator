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
│  │  │  1. Processes assignment & calls LLM API    │  │   │
│  │  │  2. Stores parsed JSON & broadcasts status  │  │   │
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
- Supports both real LLM providers and local mock generation for development/testing.

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
PORT=<YOUR_PORT>
MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>
REDIS_URL=<YOUR_REDIS_CONNECTION_STRING>
AI_PROVIDER=auto                  
AI_MODEL=<Claude / Llama compatible models>
AI_ALLOW_MOCK=false              
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
