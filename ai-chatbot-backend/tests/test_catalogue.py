"""Approved catalogue contract: reject drafts, untrusted links and changed snapshots."""
import hashlib
import json

import pytest
from pydantic import ValidationError

from app.knowledge.catalogue import CatalogueSnapshot, load_snapshot, search

COMMIT = "a" * 40


def product(**changes):
    record = {
        "slug": "oak-sample", "name": "Oak Sample", "category": "Hardwood",
        "supplier": "Approved Supplier", "description": "Oak hardwood plank",
        "canonical_url": "https://vcarehardwoodfloors.com/products/oak-sample",
        "publication_status": "published", "source_status": "verified",
        "description_authorization_status": "approved",
        "description_authorization_reference": "reviewed-description",
        "image_authorization_status": "approved",
        "image_authorization_reference": "reviewed-image",
    }
    return {**record, **changes}


def snapshot(*items):
    return {"schema_version": 1, "source_commit": COMMIT, "products": list(items)}


@pytest.mark.parametrize("changes", [
    {"publication_status": "draft"},
    {"source_status": "unresolved"},
    {"description_authorization_status": "pending"},
    {"image_authorization_status": "pending"},
    {"canonical_url": "http://vcarehardwoodfloors.com/products/oak-sample"},
    {"canonical_url": "https://evil.example/products/oak-sample"},
    {"canonical_url": "https://vcarehardwoodfloors.com/products/other"},
    {"canonical_url": "https://vcarehardwoodfloors.com/products/oak-sample?draft=1"},
    {"slug": "../admin"},
    {"category": "Other"},
])
def test_rejects_unapproved_records(changes):
    with pytest.raises(ValidationError):
        CatalogueSnapshot.model_validate(snapshot(product(**changes)))


def test_rejects_duplicate_slugs():
    with pytest.raises(ValidationError):
        CatalogueSnapshot.model_validate(snapshot(product(), product()))


def test_ranked_search_and_empty_queries():
    approved = CatalogueSnapshot.model_validate(snapshot(
        product(), product(slug="vinyl-sample", name="Vinyl Sample", category="Vinyl",
                           description="Vinyl floor", canonical_url="https://vcarehardwoodfloors.com/products/vinyl-sample"),
    ))
    assert [item.slug for item in search(approved, "oak")] == ["oak-sample"]
    assert search(approved, "notinthecatalogue") == []
    assert search(approved, "!!!") == []


def test_checksum_pinning(tmp_path):
    file = tmp_path / "catalogue.json"
    data = json.dumps(snapshot(product())).encode()
    file.write_bytes(data)
    digest = hashlib.sha256(data).hexdigest()
    assert len(load_snapshot(str(file), digest).products) == 1
    with pytest.raises(ValueError, match="checksum"):
        load_snapshot(str(file), "0" * 64)
    with pytest.raises(ValueError):
        load_snapshot("", digest)
