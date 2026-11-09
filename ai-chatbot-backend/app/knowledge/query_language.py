"""Conservative, deterministic flooring-query aliases for English and Malayalam.

Aliases describe flooring categories only; they never generate product facts.
"""
import re

# Each alias is mapped to a canonical catalogue category term. These are
# intentionally small, curated mappings, not a general translation service.
CATEGORY_ALIASES = {
    "vinyl": ("vinyl", "വിനൈൽ", "വിനൈല്", "vinayil"),
    "laminate": ("laminate", "ലാമിനേറ്റ്", "laminet"),
    "hardwood": ("hardwood", "ഹാർഡ്‌വുഡ്", "ഹാർഡ് വുഡ്", "hard wood"),
    "engineered": ("engineered", "എഞ്ചിനീയേർഡ്", "engineered wood"),
}

# A floor-related question with no explicit category still gets a product
# intent, but is not expanded to all categories or invented matches.
PRODUCT_INTENT_ALIASES = (
    "ഫ്ലോറിംഗ്", "ഫ്ലോർ", "ഫ്ലോര്", "തറ", "ഫ്ലോറിങ്",
    "flooring", "floor", "product", "recommend", "catalogue",
    "catalog", "vinyl", "laminate", "hardwood", "engineered",
)


def normalized_terms(query: str) -> set[str]:
    """Return literal English terms plus verified category aliases."""
    folded = query.casefold()
    terms = set(re.findall(r"[a-z0-9]+", folded))
    for canonical, aliases in CATEGORY_ALIASES.items():
        if any(alias in folded for alias in aliases):
            terms.add(canonical)
    return terms


def has_product_intent(query: str) -> bool:
    """Avoid interpreting ordinary greetings as product requests."""
    folded = query.casefold()
    if any(alias in folded for alias in PRODUCT_INTENT_ALIASES if not alias.isascii()):
        return True
    terms = normalized_terms(query)
    english_intents = {
        "floor", "flooring", "hardwood", "vinyl", "laminate", "engineered",
        "oak", "plank", "product", "collection", "supplier", "brand",
        "colour", "color", "finish", "waterproof", "recommend", "option",
        "catalogue", "catalog", "price", "stock", "available",
    }
    return bool(terms & english_intents)
