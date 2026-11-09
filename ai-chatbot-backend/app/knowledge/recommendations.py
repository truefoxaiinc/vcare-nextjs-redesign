"""Deterministic product cards from verified, checksum-pinned catalogue records.

The LLM never constructs product identities, links, or source revisions.
"""
from pydantic import BaseModel, ConfigDict, Field

from app.knowledge.catalogue import ApprovedProduct, CatalogueSnapshot, search


class RecommendationCard(BaseModel):
    model_config = ConfigDict(extra="forbid", frozen=True)

    slug: str
    name: str
    category: str
    supplier: str
    description: str
    canonical_url: str


class RecommendationOut(BaseModel):
    model_config = ConfigDict(extra="forbid")

    products: list[RecommendationCard] = Field(default_factory=list)
    source_commit: str | None = None
    evidence_status: str = "unavailable"


def card_from_approved(product: ApprovedProduct) -> RecommendationCard:
    return RecommendationCard(
        slug=product.slug,
        name=product.name,
        category=product.category,
        supplier=product.supplier,
        description=product.description,
        canonical_url=product.canonical_url,
    )


def recommend(snapshot: CatalogueSnapshot, query: str) -> RecommendationOut:
    matches = search(snapshot, query, limit=3)
    return RecommendationOut(
        products=[card_from_approved(product) for product in matches],
        source_commit=snapshot.source_commit,
        evidence_status="matched" if matches else "no_match",
    )
