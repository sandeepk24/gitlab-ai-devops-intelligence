# Implementation Plan

## Milestone 1 — Architecture and Foundation (this delivery)

- [x] GitHub repository and project scaffolding
- [x] Architecture and API documentation
- [x] React + Vite + TypeScript frontend
- [x] FastAPI backend with env-based config and structured logging
- [x] Health and settings endpoints
- [x] AI provider interfaces (Bedrock, Strands) — stubs only
- [x] GitLab client stub (configuration check only)
- [x] Docker Compose for local development
- [x] Infra placeholders for future AWS
- [x] Basic tests, lint, and type-check

## Milestone 2 — GitLab connectivity

- [ ] Authenticated GitLab REST client (projects, pipelines, jobs)
- [ ] Workspace-scoped token handling
- [ ] Pipeline list and detail APIs
- [ ] Frontend pipeline browser

## Milestone 3 — Intelligence

- [ ] Failure clustering and job log summaries
- [ ] Amazon Bedrock provider implementation
- [ ] Strands Agents provider implementation
- [ ] Insight APIs and UI

## Milestone 4 — Platform

- [ ] Persistence
- [ ] AWS deploy path in `infra/`
- [ ] Authn/authz for the accelerator itself
- [ ] Evaluation metrics and dashboard polish
