"""Health and settings assembly. Does not call GitLab or AI providers for inference."""

from app.core.config import settings
from app.providers.ai.factory import get_ai_provider
from app.providers.gitlab.client import GitLabClient
from app.schemas.health import HealthResponse, ReadyResponse
from app.schemas.settings import SettingsResponse


async def build_health() -> HealthResponse:
    gitlab = GitLabClient()
    provider = get_ai_provider()
    return HealthResponse(
        status="healthy",
        version=settings.app_version,
        gitlab_configured=gitlab.is_configured(),
        ai_provider=provider.name,
        bedrock_configured=settings.bedrock_configured,
        strands_configured=settings.strands_configured,
    )


def build_ready() -> ReadyResponse:
    return ReadyResponse(status="ready")


def build_settings() -> SettingsResponse:
    return SettingsResponse(
        app_name=settings.app_name,
        app_version=settings.app_version,
        gitlab_base_url=settings.gitlab_base_url,
        gitlab_configured=settings.gitlab_configured,
        aws_region=settings.aws_region,
        ai_provider=settings.ai_provider,
        bedrock_enabled=settings.bedrock_enabled,
        bedrock_model_id=settings.bedrock_model_id,
        bedrock_configured=settings.bedrock_configured,
        strands_enabled=settings.strands_enabled,
        strands_configured=settings.strands_configured,
    )
