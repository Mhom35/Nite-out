from pydantic import BaseModel
from typing import Union
# from queries.pool import pool
from psycopg import connect
# from datetime import datetime
import os
from queries.trips import (
    Error,
    TripRepository,
    TripOut,
)


keepalive_kwargs = {
    "autocommit": True
}

kwargs = {"autocommit": True}
# connection = psycopg.connect(conninfo=os.environ["DATABASE_URL"], **kwargs)

# class Error(BaseModel):
#     message: str


class WishListIn(BaseModel):
    wishlist: list


class WishListOut(BaseModel):
    id: int
    wishlist: list
    account: int


# Trip helper injection
trip_class = TripRepository()
get_trip_helper = trip_class.get_bars_for_trip


class WishListRepository:
    def create_wishlist(self, account_id: int, wishlist: WishListIn) -> TripOut:  # noqa: E501
        try:
            # connect to database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO wishlist
                            (wishlist, account)
                        VALUES
                            (%s, %s)

                        RETURNING id;
                        """,
                        [
                            wishlist.wishlist,
                            account_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.wishlist_in_to_out(id, wishlist, account_id)
        except Exception as e:
            print("error message:", e)
            return {"message": "Could not create wishlist"}

    def added_to_wishlist(self, trip_list: list):
        try:
            return get_trip_helper(trip_list)
        except Exception:
            return {"message": "trip does not exist"}

    def delete_from_wishlist(self, account_id: int, trip_id: int, wishlist: WishListIn) -> Union[WishListOut, Error]:  # noqa: E501
        try:
            # connect to database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        UPDATE wishlist
                        SET wishlist = %s,
                        WHERE account_id = %s
                        """,
                        [
                            wishlist.wishlist,
                            account_id,
                        ],
                    )
                    record = result.fetchone()
                    record.wishlist.pop(trip_id, None)
                    return record
        except Exception as e:
            print("error message:", e)
            return {"message": "Could add to wishlist"}

    def get_wishlist(self, account_id: int):
        try:
            # connect the database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    trips = []
                    result = db.execute(
                        """
                            SELECT t.id AS trip_id
                            FROM wishlist_trips AS wlt
                            JOIN wishlist AS wl ON wl.id = wlt.wishlist_id
                            JOIN trips AS t ON t.id = wlt.trip_id
                            WHERE wl.account = %s
                            """,
                        [account_id],
                    )
                    result_hash = set(result)
                    all_trip_ids = [trip[0] for trip in result_hash]
                    trips = self.added_to_wishlist(all_trip_ids)
                    return trips
        except Exception as e:
            print(e)
            return {"message": "BAR DON'T EXIST"}

    def wishlist_in_to_out(self, id: int, wishlist: WishListIn, account_id: int):  # noqa: E501
        old_data = wishlist.dict()
        return WishListOut(id=account_id, account=account_id, **old_data)

    def wishlist_add_to(self, wishlist: WishListIn, account_id: int, trip_id: int):  # noqa: E501
        old_data = wishlist.dict()
        trip_dict = {}
        trip_dict[trip_id] = get_trip_helper(trip_id)
        old_data["wishlist"].append(trip_dict)
        return WishListOut(id=account_id, account=account_id, **old_data)  # noqa: E501

    def record_to_wishlist_out(self, record):
        return WishListOut(
            id=record[0],
            wishlist=record[1],
            account=record[2],
        )




