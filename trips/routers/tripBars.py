from fastapi import APIRouter, Depends, Response
from typing import List
from typing import List, Union, Optional


from queries.trip_bars import TripBarRepository, TripBarOut, TripBarIn
from queries.trips import TripIn

router = APIRouter()


@router.post("/middletable", response_model=Optional[TripBarOut])
def create_middletable(
    tripBar: TripBarIn,
    response: Response,
    repo: TripBarRepository = Depends(),
):
    try:
        return repo.create_trip_bar(tripBar)
    except Exception:
        response.status_code = 400


@router.delete(
    "/trips/{trip_id}/delete-bar-connection/{bar_id}", response_model=bool
)
def delete_bar_from_trip(
    trip_id: int,
    bar_id: int,
    repo: TripBarRepository = Depends(),
) -> bool:
    return repo.delete_bar_from_trip(trip_id, bar_id)


@router.put("/trips/{trip_id}/update-bar")
def update_bars_for_trips(
    trip_id: int,
    trip_in: TripIn,
    repo: TripBarRepository = Depends(),
):
    return repo.update_bars_for_trips(trip_id, trip_in.locations)
