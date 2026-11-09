"""Deterministic, conservative post-generation catalogue citation guard.

This is a narrow citation policy, not a complete hallucination detector.
"""
import re
from urllib.parse import urlparse

from app.knowledge.catalogue import ApprovedProduct

SAFE_REPLY = (
    "I can help you explore flooring options, but I cannot verify specific "
    "product details right now. Which flooring type or room are you considering?"
)

PRODUCT_LINK = re.compile(r"https?://[^\s<>\[\]()]+", re.IGNORECASE)


def guard_reply(reply: str, products: list[ApprovedProduct], product_intent: bool) -> str:
    """Reject unapproved V CARE product URLs and uncited retrieved product names."""
    if not product_intent:
        return reply

    allowed_urls = {product.canonical_url for product in products}
    for match in PRODUCT_LINK.finditer(reply):
        url = match.group(0).rstrip(".,;!?")
        parsed = urlparse(url)
        if (
            parsed.hostname
            and parsed.hostname.lower() in {"www.vcarehardwoodfloors.ca", "vcarehardwoodfloors.ca"}
            and parsed.path.startswith("/products/")
            and url not in allowed_urls
        ):
            return SAFE_REPLY

    # Match names at word boundaries to avoid "Oak" matching "Oakland".
    for product in products:
        pattern = r"(?<!\w)" + re.escape(product.name) + r"(?!\w)"
        if re.search(pattern, reply, flags=re.IGNORECASE) and product.canonical_url not in reply:
            return SAFE_REPLY
    return reply
