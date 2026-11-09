"""Structured recommendation contract and fail-closed API tests."""
import hashlib
import json

from app.knowledge.catalogue import CatalogueSnapshot
from app.knowledge.recommendations import recommend
from test_sessions import client, new_session  # noqa: F401


def record(slug="oak-sample", name="Oak Sample"):
    return {
        "slug": slug, "name": name, "category": "Hardwood",
        "supplier": "Reviewed Supplier", "description": "Approved flooring description",
        "canonical_url": f"https://www.vcarehardwoodfloors.ca/products/{slug}",
        "publication_status": "published", "source_status": "verified",
        "description_authorization_status": "approved",
        "description_authorization_reference": "description-approval",
        "image_authorization_status": "approved",
        "image_authorization_reference": "image-approval",
    }


def test_recommendations_are_structured_and_source_backed():
    snapshot = CatalogueSnapshot.model_validate({
        "schema_version": 1, "source_commit": "a" * 40,
        "products": [record()],
    })
    result = recommend(snapshot, "oak")
    assert result.evidence_status == "matched"
    assert result.source_commit == "a" * 40
    assert result.products[0].canonical_url.endswith("/products/oak-sample")
    assert "price" not in result.products[0].model_dump()
    assert "stock" not in result.products[0].model_dump()
    assert recommend(snapshot, "nonexistent").evidence_status == "no_match"


def test_api_requires_session_and_fails_closed_without_snapshot(client):
    http, _ = client
    session = new_session(http)
    url = "/api/v1/chat/sessions/" + session["session_id"] + "/recommendations?q=oak"
    assert http.get(url).status_code == 401
    response = http.get(url, headers={"Authorization": "Bearer " + session["token"]})
    assert response.status_code == 200
    assert response.json() == {
        "products": [], "source_commit": None, "evidence_status": "unavailable",
    }


def test_api_rejects_other_session(client):
    http, _ = client
    first, second = new_session(http), new_session(http)
    url = "/api/v1/chat/sessions/" + first["session_id"] + "/recommendations?q=oak"
    response = http.get(url, headers={"Authorization": "Bearer " + second["token"]})
    assert response.status_code == 403


def test_api_approved_snapshot_and_tampering(client, tmp_path):
    from app.core.config import Settings, get_settings
    from app.main import app

    http, _ = client
    session = new_session(http)
    url = "/api/v1/chat/sessions/" + session["session_id"] + "/recommendations?q=oak"
    headers = {"Authorization": "Bearer " + session["token"]}
    file = tmp_path / "approved.json"
    data = json.dumps({
        "schema_version": 1, "source_commit": "a" * 40,
        "products": [record()],
    }).encode()
    file.write_bytes(data)
    settings = Settings(
        _env_file=None, catalogue_snapshot_path=str(file),
        catalogue_snapshot_sha256=hashlib.sha256(data).hexdigest(),
        ip_rate_limit=100, session_rate_limit=100,
    )
    app.dependency_overrides[get_settings] = lambda: settings
    response = http.get(url, headers=headers)
    assert response.status_code == 200
    assert response.json()["products"][0]["name"] == "Oak Sample"
    file.write_bytes(data + b" ")
    assert http.get(url, headers=headers).status_code == 503
