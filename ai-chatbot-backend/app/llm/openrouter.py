import httpx

from app.core.config import Settings


class ProviderUnavailable(Exception):
    pass


async def complete(messages: list[dict[str, str]], settings: Settings) -> str:
    if not settings.openrouter_api_key:
        raise ProviderUnavailable("AI provider not configured")

    endpoint = settings.openrouter_base_url.rstrip("/") + "/chat/completions"
    if not endpoint.startswith("https://"):
        raise ProviderUnavailable("AI provider URL must use HTTPS")
    try:
        async with httpx.AsyncClient(timeout=settings.openrouter_timeout_seconds) as client:
            response = await client.post(
                endpoint,
                headers={"Authorization": f"Bearer {settings.openrouter_api_key}"},
                json={
                    "model": settings.openrouter_model,
                    "messages": messages,
                    "max_tokens": settings.max_output_tokens,
                    "temperature": 0.4,
                },
            )
            response.raise_for_status()
            data = response.json()
            answer = data["choices"][0]["message"]["content"]
            if not isinstance(answer, str) or not answer.strip():
                raise ValueError("Empty model response")
            return answer.strip()
    except (httpx.HTTPError, ValueError, KeyError, IndexError, TypeError) as exc:
        raise ProviderUnavailable("AI service temporarily unavailable") from exc
