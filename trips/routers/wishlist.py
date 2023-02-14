import sys
from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.wishlist import (
    Error,
    WishListIn,
    WishListRepository,
    WishListOut,
)
from authenticator import authenticator


sys.path.append("..")


router = APIRouter()


@router.get("/wishlist")
def get_wishlist(
    repo: WishListRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_wishlist(account_data["id"])


@router.delete("/wishlist/{trip_id}", response_model=bool)
def delete_from_wishlist(
    wishlist: WishListIn,
    trip_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WishListRepository = Depends(),
) -> bool:
    return repo.delete_from_wishlist(account_data["id"], trip_id, wishlist)


@router.post("/wishlist", response_model=Union[WishListOut, Error])
def create_wishlist(
    wishlist: WishListIn,
    response: Response,
    repo: WishListRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        created_wishlist = repo.create_wishlist(account_data["id"], wishlist)  # noqa: E501
        return created_wishlist
    except Exception:
        response.status_code = 400