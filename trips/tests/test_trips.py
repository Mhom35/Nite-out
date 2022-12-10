from os import environ
import config
from fastapi.testclient import TestClient
from main import app
from queries.trips import TripRepository
from queries.bars import BarsRepository


client = TestClient(app)


# Mitchell Unit Test
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


# Derrick Unit Test
class EmptyBarRepository:
    def get_all_bars(BarOut):
        return []


def test_get_all_bars():

    # Arrange
    app.dependency_overrides[BarsRepository] = EmptyBarRepository

    # Act
    response = client.get("/bars")

    # Clean Up
    assert response.status_code == 200
    assert response.json() == []


# Tyler Unit Test
class DeleteTable:
    def delete_all_bars_from_trip():
        return True


def test_delete_all_bars_from_trip():

    # Arrange
    app.dependency_overrides[TripRepository] = DeleteTable

    # Act
    response = client.delete("/trips/1/delete-bar-connection/1")

    # Clean Up
    assert response.status_code == 200
    assert response.json() is False
