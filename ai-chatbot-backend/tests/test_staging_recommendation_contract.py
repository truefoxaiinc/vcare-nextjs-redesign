"""Offline validation of staging recommendation provenance and canonical URLs."""
import importlib.util
from pathlib import Path

import pytest

MODULE = Path(__file__).resolve().parents[1] / "scripts" / "staging_smoke.py"
spec = importlib.util.spec_from_file_location("staging_smoke_url_contract", MODULE)
smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke)


def card():
    return {
        "slug": "oak-floor", "name": "Oak Floor", "category": "Hardwood",
        "supplier": "Approved Supplier", "description": "Approved product",
        "canonical_url": "https://www.vcarehardwoodfloors.ca/products/oak-floor",
    }


def response(status="matched", products=None, revision=None):
    if products is None:
        products = [card()] if status == "matched" else []
    if revision is None and status != "unavailable":
        revision = "a" * 40
    return {"evidence_status": status, "products": products, "source_commit": revision}


def test_approved_product_and_source_revision():
    assert smoke.valid_recommendations(response())
    assert smoke.valid_recommendations(response("no_match"))
    assert smoke.valid_recommendations(response("unavailable"))


@pytest.mark.parametrize("url", [
    "https://evil.example/products/oak-floor",
    "https://www.vcarehardwoodfloors.ca.evil.example/products/oak-floor",
    "http://www.vcarehardwoodfloors.ca/products/oak-floor",
    "https://user@www.vcarehardwoodfloors.ca/products/oak-floor",
    "https://www.vcarehardwoodfloors.ca/products/oak-floor?redirect=1",
    "https://www.vcarehardwoodfloors.ca/products/oak-floor#top",
    "https://www.vcarehardwoodfloors.ca/products/other-floor",
    "https://www.vcarehardwoodfloors.ca:444/products/oak-floor",
])
def test_rejects_unsafe_or_mismatched_canonical_urls(url):
    product = card()
    product["canonical_url"] = url
    assert not smoke.valid_recommendations(response(products=[product]))


def test_rejects_missing_or_unverified_source_revision():
    assert not smoke.valid_recommendations(response(revision="not-a-commit"))
    payload = response()
    payload["source_commit"] = None
    assert not smoke.valid_recommendations(payload)


def test_rejects_inconsistent_evidence_and_extra_products():
    assert not smoke.valid_recommendations(response("matched", products=[]))
    assert not smoke.valid_recommendations(response("no_match", products=[card()]))
    assert not smoke.valid_recommendations(response(products=[card()] * 4))
    assert not smoke.valid_recommendations(response("unavailable", products=[card()]))


def test_rejects_unapproved_price_or_stock_fields():
    for key in ("price", "stock"):
        product = card()
        product[key] = "unknown"
        assert not smoke.valid_recommendations(response(products=[product]))
