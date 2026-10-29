"""Provider stubs must not call GitLab or AWS."""

import pytest

from app.providers.ai.base import AINotImplementedError
from app.providers.ai.factory import get_ai_provider
from app.providers.gitlab.client import GitLabClient


@pytest.mark.asyncio
async def test_default_provider_is_bedrock_stub():
    provider = get_ai_provider()
    assert provider.name == "bedrock"
    assert await provider.is_available() is False
    with pytest.raises(AINotImplementedError):
        await provider.generate("summarize this pipeline")


@pytest.mark.asyncio
async def test_strands_provider_stub():
    provider = get_ai_provider("strands")
    assert provider.name == "strands"
    assert await provider.is_available() is False
    with pytest.raises(AINotImplementedError):
        await provider.generate("unused")


def test_gitlab_client_is_unconfigured_without_token():
    client = GitLabClient()
    assert client.is_configured() is False
