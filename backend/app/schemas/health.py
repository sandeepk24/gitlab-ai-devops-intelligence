"""Health and readiness schemas."""

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    version: str
    gitlab_configured: bool
    ai_provider: str
    bedrock_configured: bool
    strands_configured: bool


class ReadyResponse(BaseModel):
    status: str
