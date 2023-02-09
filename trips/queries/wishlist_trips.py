from pydantic import BaseModel
from psycopg import connect
import os


keepalive_kwargs = {
 "keepalives": 1,
 "keepalives_idle": 60,
 "keepalives_interval": 10,
 "keepalives_count": 5
}


class WishListTripIn(BaseModel):
    wishlist_id: int
    trip_id: int



class WishListTripOut(BaseModel):
    wishlist_id: int
    trip_id: int



class WishListTripRepository:
    def create_wishlist_trip(self, account_id: int, wishlist_trips: WishListTripIn) -> WishListTripOut:
        try:
            # connect to database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO wishlist_trips (
                            wishlist_id, 
                            trip_id
                        )
                        VALUES
                            (%s, %s)
                        RETURNING wishlist_id, trip_id
                        """,
                        [
                            account_id,
                            wishlist_trips.trip_id,
                        ],
                    )
                    row = result.fetchone()
                    return {
                        "wishlist_id": row[0],
                        "trip_id": row[1],
                    }

        except Exception:
            return {"message": "Create did not work"}

    def delete_trip_from_wishlist(self, wishlist_id: int, trip_id: int):
            try:
                # connect to database
                with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                    # get cursor (something to run SQL with)
                    with conn.cursor() as db:
                        # Run our INSERT statement
                        db.execute(
                            """
                            DELETE FROM wishlist_trips
                            WHERE wishlist_id = %s AND trip_id = %s
                            """,
                            [wishlist_id, trip_id],
                        )
                        return True
            except Exception as e:
                print(e)
                return False