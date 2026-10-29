"""Non-secret settings exposed to the UI."""

from pydantic import BaseModel


class SettingsResponse(BaseModel):
    app_name: str
    app_version: str
    gitlab_base_url: str
    gitlab_configured: bool
    aws_region: str
    ai_provider: str
    bedrock_enabled: bool
    bedrock_model_id: str
    bedrock_configured: bool
    strands_enabled: bool
    strands_configured: bool
