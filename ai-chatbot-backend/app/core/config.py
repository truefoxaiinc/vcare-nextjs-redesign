from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"
    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_model: str = "openai/gpt-4o-mini"
    openrouter_timeout_seconds: float = 20
    max_message_length: int = 2000
    max_output_tokens: int = 400
    database_url: str = "postgresql+asyncpg://vcare:vcare@db:5432/vcare_chatbot"
    redis_url: str = "redis://redis:6379/0"
    session_ttl_seconds: int = Field(default=86400, ge=60, le=604800)
    history_turn_limit: int = Field(default=20, ge=2, le=40)
    ip_rate_limit: int = Field(default=30, ge=1, le=1000)
    session_rate_limit: int = Field(default=12, ge=1, le=1000)

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
