import pytest
from app import app, items


@pytest.fixture(autouse=True)
def reset_items():
    """Reset items list and next_id before each test."""
    import app as app_module
    app_module.items = [
        {"id": 1, "name": "Item One"},
        {"id": 2, "name": "Item Two"},
    ]
    app_module.next_id = 3
    yield


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}


def test_get_items(client):
    response = client.get("/api/items")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 2
    assert data[0]["name"] == "Item One"


def test_create_item(client):
    response = client.post("/api/items", json={"name": "New Item"})
    assert response.status_code == 201
    data = response.get_json()
    assert data["name"] == "New Item"
    assert "id" in data


def test_create_item_missing_name(client):
    response = client.post("/api/items", json={})
    assert response.status_code == 400
    assert "error" in response.get_json()


def test_delete_item(client):
    response = client.delete("/api/items/1")
    assert response.status_code == 200
    assert response.get_json()["deleted"] == 1


def test_delete_item_not_found(client):
    response = client.delete("/api/items/999")
    assert response.status_code == 404
    assert "error" in response.get_json()
