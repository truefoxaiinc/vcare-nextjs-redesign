"""Fail-closed, read-only catalogue snapshots; no network fetch or unapproved records."""
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlparse

from pydantic import BaseModel, ConfigDict, Field, model_validator

SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SHA = re.compile(r"^[0-9a-f]{40}$")
CATEGORIES = {"Hardwood", "Engineered Hardwood", "Laminate", "Vinyl"}


class ApprovedProduct(BaseModel):
    model_config = ConfigDict(extra="forbid", frozen=True)

    slug: str
    name: str = Field(min_length=1, max_length=200)
    category: str
    supplier: str = Field(min_length=1, max_length=120)
    description: str = Field(min_length=1, max_length=2000)
    canonical_url: str
    publication_status: str
    source_status: str
    description_authorization_status: str
    description_authorization_reference: str = Field(min_length=1)
    image_authorization_status: str
    image_authorization_reference: str = Field(min_length=1)

    @model_validator(mode="after")
    def approved(self) -> "ApprovedProduct":
        if not SLUG.fullmatch(self.slug) or self.category not in CATEGORIES:
            raise ValueError("Invalid catalogue slug or category")
        if (
            self.publication_status != "published"
            or self.source_status != "verified"
            or self.description_authorization_status != "approved"
            or self.image_authorization_status != "approved"
        ):
            raise ValueError("Unpublished, unverified or unauthorized product")
        url = urlparse(self.canonical_url)
        if (
            url.scheme != "https"
            or not url.hostname
            or url.username is not None
            or url.password is not None
            or url.query
            or url.fragment
            or url.hostname.lower() not in {"www.vcarehardwoodfloors.ca", "vcarehardwoodfloors.ca"}
            or url.path != "/products/" + self.slug
        ):
            raise ValueError("Invalid canonical product URL")
        return self


class CatalogueSnapshot(BaseModel):
    model_config = ConfigDict(extra="forbid", frozen=True)

    schema_version: int
    source_commit: str
    products: tuple[ApprovedProduct, ...]

    @model_validator(mode="after")
    def validate_snapshot(self) -> "CatalogueSnapshot":
        if self.schema_version != 1 or not SHA.fullmatch(self.source_commit):
            raise ValueError("Invalid snapshot schema or source commit")
        slugs = [item.slug for item in self.products]
        if len(slugs) != len(set(slugs)):
            raise ValueError("Duplicate product slug")
        return self


def load_snapshot(path: str, expected_sha256: str) -> CatalogueSnapshot:
    """Pin snapshot bytes to a reviewed checksum; never silently trust a changed file."""
    if not path or not re.fullmatch(r"[0-9a-f]{64}", expected_sha256):
        raise ValueError("Catalogue snapshot must have an approved SHA-256")
    file = Path(path)
    if not file.is_file() or file.stat().st_size > 5_000_000:
        raise ValueError("Missing or oversized catalogue snapshot")
    data = file.read_bytes()
    if hashlib.sha256(data).hexdigest() != expected_sha256:
        raise ValueError("Catalogue checksum mismatch")
    return CatalogueSnapshot.model_validate(json.loads(data))


def search(snapshot: CatalogueSnapshot, query: str, limit: int = 5) -> list[ApprovedProduct]:
    """Deterministic token matching; no LLM claims or approximate product inference."""
    terms = set(re.findall(r"[a-z0-9]+", query.casefold()))
    if not terms:
        return []
    ranked = []
    for item in snapshot.products:
        name = item.name.casefold()
        supplier = item.supplier.casefold()
        category = item.category.casefold()
        slug = item.slug.replace("-", " ")
        searchable = f"{name} {supplier} {category} {slug} {item.description.casefold()}"
        score = sum(
            4 if term in name.split() else
            3 if term in supplier.split() or term in category.split() else
            1 if term in searchable.split() else 0
            for term in terms
        )
        if score:
            ranked.append((score, item.slug, item))
    ranked.sort(key=lambda result: (-result[0], result[1]))
    return [item for _, _, item in ranked[:max(1, min(limit, 10))]]
