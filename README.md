# GitLab AI DevOps Intelligence

Enterprise-grade accelerator for GitLab CI/CD intelligence. Point it at GitLab later; it will surface pipeline health and, with Amazon Bedrock or Strands Agents, explain failures.

This repository is the **foundation**: a runnable React + FastAPI app, Docker Compose, health checks, and typed provider boundaries. GitLab API calls and model inference are not implemented yet.

**Repo:** https://github.com/sandeepk24/gitlab-ai-devops-intelligence

---

## What works today

- FastAPI backend with structured logging, CORS, and `/api/v1/health`
- React 19 + Vite + TypeScript UI (dashboard, pipeline placeholder, settings)
- Environment-based configuration (Pydantic Settings)
- AI provider **interfaces** for Amazon Bedrock and Strands Agents (stubs)
- GitLab client **stub** that only reports whether a token is configured
- Docker Compose for local backend + frontend

## What is not implemented

| Capability | Status |
|------------|--------|
| GitLab REST/GraphQL calls | Not started |
| Pipeline ingestion | Not started |
| Bedrock `InvokeModel` | Interface only |
| Strands Agents runtime | Interface only |
| AWS infrastructure apply | Placeholders in `infra/` |

---

## Local development

### Prerequisites

- Node.js 20+
- Python 3.12+
- Docker (optional, for Compose)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp ../.env.example ../.env
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs  
Health: http://localhost:8000/api/v1/health

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. Vite proxies `/api` to the backend.

### Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

- UI: http://localhost:8080  
- API: http://localhost:8000/api/v1/health  

---

## Configuration

Copy `.env.example` to `.env`. Important variables:

| Variable | Purpose |
|----------|---------|
| `GITLAB_BASE_URL` | GitLab instance (unused until Milestone 2) |
| `GITLAB_TOKEN` | Personal or project token (never logged) |
| `AI_PROVIDER` | `bedrock` or `strands` |
| `AWS_REGION` | Region for future Bedrock calls |
| `BEDROCK_MODEL_ID` | Model id when Bedrock is implemented |
| `CORS_ORIGINS` | Allowed frontend origins |
| `VITE_API_BASE_URL` | Leave empty in Vite; set if the UI talks to the API directly |

---

## Project layout

```
gitlab-ai-devops-intelligence/
├── frontend/           React 19 + Vite SPA
├── backend/            FastAPI app
├── tests/              Pytest (health, config, provider stubs)
├── docs/               API and implementation plan
├── infra/              Future AWS (Terraform placeholders)
├── docker-compose.yml
├── architecture.md
├── .env.example
└── README.md
```

---

## Development checks

```bash
# Backend
cd backend && pytest ../tests
cd backend && ruff check . && ruff format --check .

# Frontend
cd frontend && npm run type-check
cd frontend && npm run lint
cd frontend && npm run build
```

## License

MIT
