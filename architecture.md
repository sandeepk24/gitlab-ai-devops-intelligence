# Architecture

GitLab AI DevOps Intelligence is an enterprise accelerator for GitLab CI/CD visibility and, later, AI-assisted diagnosis. This document describes the **foundation** only. GitLab API integration and model inference are not implemented yet.

## System context

```text
Browser  →  React SPA (Vite)  →  FastAPI  →  (future) GitLab REST/GraphQL
                                      ↘  (future) Amazon Bedrock / Strands Agents
```

Local development uses Docker Compose (backend + frontend) or two processes with the Vite `/api` proxy.

## Layers

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Presentation | `frontend/src/pages`, `components` | Routing, layout, health UI |
| API client | `frontend/src/api` | Typed HTTP only — no `fetch` in pages |
| HTTP API | `backend/app/api/v1` | Versioned REST, Pydantic I/O |
| Services | `backend/app/services` | Use-case orchestration |
| Providers | `backend/app/providers` | External systems behind interfaces |
| Core | `backend/app/core` | Settings, logging |

Pages must not import FastAPI types, boto3, or GitLab SDKs. Providers must not import API routers.

## Provider boundaries (future)

```text
services/
    gitlab_intelligence.py     # not implemented
    insight.py                 # not implemented
providers/
    gitlab/client.py           # configured? only — no HTTP yet
    ai/base.py                 # AIProvider protocol
    ai/bedrock.py              # stub
    ai/strands.py              # stub
    ai/factory.py              # selects provider from AI_PROVIDER
```

`AIProvider` is the only surface services will call. Bedrock and Strands can be swapped without changing API handlers. GitLab tokens stay in environment configuration and are never written to logs or JSON responses.

## Configuration

Pydantic Settings load `.env` and environment variables. Secrets (`GITLAB_TOKEN`, AWS credentials) are optional in this milestone. Health reports **whether they are set**, not their values.

## Observability

Structured stdout logging (`timestamp | level | logger | message`). Health: `GET /api/v1/health`. Unhandled exceptions return a generic 500 and are logged server-side.

## Runtime

- Frontend: React 19, Vite, TypeScript, Tailwind, TanStack Query, React Router
- Backend: FastAPI, Pydantic v2, Uvicorn
- Compose: `backend` (8000), `frontend` (8080, nginx → backend `/api`)
- Cloud (later): see `infra/` — ECS/Fargate, ALB, IAM for Bedrock; not provisioned here

## API versioning

All routes are under `/api/v1/`. Breaking changes require a new prefix.
