"""Offline adversarial regression cases for the deterministic response guard."""
import pytest

from app.knowledge.catalogue import ApprovedProduct
from app.knowledge.response_guard import SAFE_REPLY, guard_reply


def product(slug="oak-sample", name="Oak Sample"):
    return ApprovedProduct.model_validate({
        "slug": slug,
        "name": name,
        "category": "Hardwood",
        "supplier": "Example Supplier",
        "description": "Approved example",
        "canonical_url": f"https://www.vcarehardwoodfloors.ca/products/{slug}",
        "publication_status": "published",
        "source_status": "verified",
        "description_authorization_status": "approved",
        "description_authorization_reference": "review-1",
        "image_authorization_status": "approved",
        "image_authorization_reference": "review-2",
    })


@pytest.mark.parametrize("reply", [
    "Oak Sample is worth considering.",
    "oak sample is worth considering.",
    "See https://www.vcarehardwoodfloors.ca/products/unapproved.",
    "See http://www.vcarehardwoodfloors.ca/products/oak-sample",
    "See https://www.vcarehardwoodfloors.ca/products/oak-sample?discount=50",
])
def test_blocks_uncited_or_unapproved_catalogue_claims(reply):
    assert guard_reply(reply, [product()], True) == SAFE_REPLY


def test_allows_cited_approved_product():
    item = product()
    reply = f"Oak Sample may be relevant: {item.canonical_url}"
    assert guard_reply(reply, [item], True) == reply


def test_avoids_substring_false_positive():
    reply = "Oakland is a city."
    assert guard_reply(reply, [product(name="Oak")], True) == reply


def test_no_matching_evidence_does_not_allow_invented_product_url():
    reply = "See https://www.vcarehardwoodfloors.ca/products/fake-floor"
    assert guard_reply(reply, [], True) == SAFE_REPLY


def test_non_product_greeting_unchanged():
    reply = "Welcome! https://www.vcarehardwoodfloors.ca/products/unknown"
    assert guard_reply(reply, [], False) == reply


def test_external_url_is_not_claimed_to_be_verified():
    # This guard is deliberately limited to V CARE product links.
    reply = "You can read a flooring guide at https://example.org/guide"
    assert guard_reply(reply, [], True) == reply
