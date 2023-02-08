from pydantic import BaseModel
from typing import Optional, List, Union
# from queries.pool import pool
from psycopg import connect
from datetime import datetime
import os
from queries.trips import (
    Error,
    TripIn,
    TripRepository,
    TripOut,
)



keepalive_kwargs = {
    "autocommit": True
}

kwargs = {"autocommit": True}
# connection = psycopg.connect(conninfo=os.environ["DATABASE_URL"], **kwargs)

class Error(BaseModel):
    message: str


class WishListIn(BaseModel):
    wishlist: dict
    account: int

class WishListOut(BaseModel):
    id: int
    wishlist: dict
    account: int


# Trip helper injection
trip_class = TripRepository()
get_trip_helper = trip_class.get_individual_trip




class wishlistRepository:
    def create_trip(self, account_id: int, wishlist: WishListIn) -> TripOut:
        try:
            # connect to database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO wishlist
                            (wishlist, account_id)
                        VALUES
                            (%s, %s, %s)

                        RETURNING id;
                        """,
                        [
                            wishlist.wishlist,
                            account_id,
      
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.wishlist_in_to_out(id, wishlist, account_id)

    def add_to_wishlist(self, account_id: int, trip_id: int, wishlist: WishListIn) -> Union[WishListOut, Error]:
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
                            trip.trip_name,
                            trip.wishlist,
                            account_id,
                        ],
                    )

                    
                    result.wishlist[trip_id] = (get_trip_helper(trip_id))

                    return result
        except Exception as e:
            print("error message:", e)
            return {"message": "Could add to wishlist"}
    
    def delete_from_wishlist(self, account_id: int, trip_id: int, wishlist: WishListIn) -> Union[WishListOut, Error]:
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
                            trip.trip_name,
                            trip.wishlist,
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
                    result = db.execute(
                        """
                        SELECT *
                        FROM wishlist
                        WHERE account_id = %s
                        """,
                        [account_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_wishlist_out(record)
        except Exception as e:
            print(e)
            return {"message": "BAR DON'T EXIST"}




    def wishlist_in_to_out(self, id: int, wishlist: WishListIn, account_id: int):
        old_data = wishlist.dict()
        return WishListOut(id=id, account=account_id, **old_data)

    def record_to_wishlist_out(self, record):
        return WishlistOut(
            wishlist_id=record[0],
            wishlist=record[1],
            account_id=record[2],
        )



create_wishlist

update_wishlist

get_wishlist

