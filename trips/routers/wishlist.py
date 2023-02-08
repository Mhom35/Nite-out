import sys
from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.wishlist import (
    Error,
    WishListIn,
    WishListRepository,
    WishListOut,
)
from authenticator import authenticator


sys.path.append("..")


router = APIRouter()


@router.get("/wishlist", response_model=Union[List[TripOut], Error])
def get_wishlist(
    repo: wishlistRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_wishlist(account_data["id"])


@router.put("/wishlist/{wishlist_id}", response_model=Union[wishlistOut, Error])
def update_trip(
    wishlist_id: int,
    wishlist: WishlistIn,
    repo: wishlistRepository = Depends(),
) -> Union[TripOut, Error]:
    return repo.update_wishlist(trip_id, wishlist)


@router.post("/wishlist", response_model=Union[wishlistOut, Error])
def create_wishlist(
    wishlist: wishlistIn,
    response: Response,
    repo: WishListRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        created_wishlist = repo.create_wishlist(account_data["id"],wishlist)
        return created_wishlist
    except Exception:
        response.status_code = 400