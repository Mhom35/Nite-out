import sys

sys.path.append("..")
from fastapi import APIRouter, Depends, Response, HTTPException, status
from typing import List
from typing import List, Union, Optional
from queries.trips import (
    Error,
    TripIn,
    TripRepository,
    TripOut,
)

from queries.trip_bars import TripBarRepository, TripBarOut, TripBarIn
from queries.yelp_get_bars import bar_in_db
from queries.requests_yelp import API_KEY

from authenticator import authenticator

# from token_auth import get_current_user


router = APIRouter()

# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )


@router.post("/trips", response_model=Union[TripOut, Error])
def create_trip(
    trip: TripIn,
    response: Response,
    repo: TripRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    # account: dict = Depends(get_current_user),
):
    try:
        created_trip = repo.create_trip(trip)
        return created_trip
    except Exception:
        response.status_code = 400


@router.get("/trips", response_model=Union[List[TripOut], Error])
def get_all_trips(
    repo: TripRepository = Depends(),
):
    return repo.get_all_trips()


@router.put("/trips/{trip_id}", response_model=Union[TripOut, Error])
def update_trip(
    trip_id: int,
    trip: TripIn,
    repo: TripRepository = Depends(),
) -> Union[TripOut, Error]:
    return repo.update_trip(trip_id, trip)


@router.delete("/trips/{trip_id}", response_model=bool)
def delete_trip(
    trip_id: int,
    repo: TripRepository = Depends(),
) -> bool:
    try:
        repo.delete_trip(trip_id)
        repo.delete_all_bars_from_trip(trip_id)
    except Exception:
        return {"message": "trip does not exist"}


# @router.get("/trips/{trip_id}", response_model=Optional[TripOut])
# def get_one_trip(
#     trip_id: int,
#     response: Response,
#     repo: TripRepository = Depends(),
# ) -> TripOut:
#     trip = repo.get_one_trip(trip_id)
#     if trip is None:
#         response.status_code = 404
#     return trip


@router.get("/trips/{trip_id}/getbars", response_model=Optional[TripOut])
def get_trip_bars(
    trip_id: int,
    response: Response,
    repo: TripRepository = Depends(),
) -> TripOut:
    trip_bars = repo.get_bars_for_trip(trip_id=trip_id)
    if trip_bars is None:
        response.status_code = 404
    return trip_bars
