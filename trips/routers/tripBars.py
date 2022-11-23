from fastapi import APIRouter, Depends, Response
from typing import List
from typing import List, Union, Optional


from queries.trip_bars import (TripBarRepository, TripBarOut, TripBarIn)

router = APIRouter()

@router.post("/middletable", response_model=Optional[TripBarOut])
def create_middletable(
    tripBar:TripBarIn,
    response: Response,
    repo: TripBarRepository = Depends(),
):
    try:
        return repo.create_trip_bar(tripBar)
    except Exception:
        response.status_code = 400
