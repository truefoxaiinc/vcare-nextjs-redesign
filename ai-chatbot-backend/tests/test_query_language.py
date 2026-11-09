"""Deterministic multilingual intent and retrieval regression coverage."""
import pytest

from app.knowledge.catalogue import CatalogueSnapshot, search
from app.knowledge.query_language import has_product_intent, normalized_terms


@pytest.mark.parametrize(("query", "expected"), [
    ("vinyl flooring", "vinyl"),
    ("വിനൈൽ ഫ്ലോറിംഗ് വേണം", "vinyl"),
    ("laminet flooring", "laminate"),
    ("ലാമിനേറ്റ് ഫ്ലോറിംഗ്", "laminate"),
    ("ഹാർഡ്‌വുഡ് ഫ്ലോറിംഗ്", "hardwood"),
    ("engineered wood", "engineered"),
])
def test_curated_category_aliases(query, expected):
    assert expected in normalized_terms(query)
    assert has_product_intent(query)


@pytest.mark.parametrize("query", [
    "Hello", "Hi there", "നമസ്കാരം", "Thanks",
])
def test_greetings_do_not_trigger_catalogue(query):
    assert not has_product_intent(query)


def test_malayalam_flooring_question_is_product_intent():
    assert has_product_intent("തറയ്ക്ക് എന്താണ് നല്ലത്?")


def test_unrecognized_malayalam_is_not_guessed():
    assert not has_product_intent("എന്തൊക്കെയുണ്ട്?")


def test_malayalam_query_matches_only_approved_category():
    snapshot = CatalogueSnapshot.model_validate({
        "schema_version": 1,
        "source_commit": "a" * 40,
        "products": [
            {
                "slug": "vinyl-sample", "name": "Vinyl Sample",
                "category": "Vinyl", "supplier": "Reviewed Supplier",
                "description": "Approved vinyl flooring",
                "canonical_url": "https://www.vcarehardwoodfloors.ca/products/vinyl-sample",
                "publication_status": "published", "source_status": "verified",
                "description_authorization_status": "approved",
                "description_authorization_reference": "review",
                "image_authorization_status": "approved",
                "image_authorization_reference": "review",
            },
        ],
    })
    assert [item.slug for item in search(snapshot, "വിനൈൽ ഫ്ലോറിംഗ്")] == ["vinyl-sample"]
    assert search(snapshot, "ലാമിനേറ്റ് ഫ്ലോറിംഗ്") == []
