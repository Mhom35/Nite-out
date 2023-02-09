from fastapi import APIRouter, Depends, Response
from typing import Optional


from queries.wishlist_trips import (
    WishListTripRepository,
    WishListTripOut,
    WishListTripIn,
)

from authenticator import authenticator

router = APIRouter()


@router.post("/wltrip", response_model=Optional[WishListTripOut])
def add_trip_to_wishlist(
    WishListTrip: WishListTripIn,
    response: Response,
    repo: WishListTripRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.create_wishlist_trip(account_data["id"], WishListTrip)
    except Exception:
        response.status_code = 400


@router.delete("/wltrip/{trip_id}/delete-trip-connection", response_model=bool)
def delete_trip_from_wishlist(
    trip_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WishListTripRepository = Depends(),
) -> bool:
    return repo.delete_trip_from_wishlist(account_data["id"], trip_id)

