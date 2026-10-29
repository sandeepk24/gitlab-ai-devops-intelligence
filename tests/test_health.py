"""Health, readiness, and settings endpoints."""

import pytest


@pytest.mark.asyncio
async def test_health_endpoint(client):
    resp = await client.get("/api/v1/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert data["gitlab_configured"] is False
    assert data["bedrock_configured"] is False
    assert data["strands_configured"] is False
    assert data["ai_provider"] in {"bedrock", "strands"}
    assert "GITLAB_TOKEN" not in str(data)
    assert "token" not in str(data).lower()


@pytest.mark.asyncio
async def test_ready_endpoint(client):
    resp = await client.get("/api/v1/ready")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ready"


@pytest.mark.asyncio
async def test_settings_omits_secrets(client):
    resp = await client.get("/api/v1/settings")
    assert resp.status_code == 200
    data = resp.json()
    assert "gitlab_token" not in data
    assert data["gitlab_base_url"]
    assert data["bedrock_enabled"] is False
