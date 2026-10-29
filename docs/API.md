# API Reference

Base URL: `http://localhost:8000/api/v1`

Interactive docs: `http://localhost:8000/docs`

## GET /health

Liveness plus configuration **presence** (never secret values).

```json
{
  "status": "healthy",
  "version": "0.1.0",
  "gitlab_configured": false,
  "ai_provider": "bedrock",
  "bedrock_configured": false,
  "strands_configured": false
}
```

## GET /ready

Readiness for process orchestration. Returns 200 when the API can serve traffic.

## GET /settings

Non-secret runtime settings (GitLab base URL, AWS region, selected AI provider, model id). Tokens are omitted.
