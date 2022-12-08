from fastapi.testclient import TestClient
from main import app
from queries.trips import TripRepository


client = TestClient(app)


class EmptyTripRepository:
    def get_all_trips(TripOut):
        return []


def test_get_all_trips():

    # Arrange
    app.dependency_overrides[TripRepository] = EmptyTripRepository

    # Act
    response = client.get("/trips")

    # clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []
