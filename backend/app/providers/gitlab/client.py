"""GitLab client stub. No REST or GraphQL calls in this milestone."""

from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)


class GitLabClient:
    """Reports configuration presence only. Token values are never logged."""

    def is_configured(self) -> bool:
        configured = settings.gitlab_configured
        logger.debug("GitLab configured=%s host=%s", configured, settings.gitlab_base_url)
        return configured
