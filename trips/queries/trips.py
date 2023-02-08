from pydantic import BaseModel
from typing import Optional, List, Union
# from queries.pool import pool
from psycopg import connect
from datetime import datetime
from .bars import BarOutWithPosition
import os


keepalive_kwargs = {
    "autocommit": True
}

kwargs = {"autocommit": True}
# connection = psycopg.connect(conninfo=os.environ["DATABASE_URL"], **kwargs)

class Error(BaseModel):
    message: str


class TripIn(BaseModel):
    trip_name: str
    locations: list
    description: str
    created_on: datetime
    image_url: Optional[str]
    likes: Optional[int]
    distance: Optional[int]


class TripOut(BaseModel):
    id: int
    trip_name: str
    locations: list
    description: str
    created_on: datetime
    image_url: Optional[str]
    likes: Optional[int]
    distance: Optional[int]


class TripRepository:
    def delete_trip(self, trip_id: int) -> bool:
        try:
            # connect the database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM trips
                        WHERE id = %s
                        """,
                        [trip_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def delete_all_bars_from_trip(self, trip_id: int):
        try:
            # connect the database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM trip_bars
                        WHERE trip_id = %s
                        """,
                        [trip_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_trip(self, trip_id: int, trip: TripIn) -> Union[TripOut, Error]:
        try:
            # connect to database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    db.execute(
                        """
                        UPDATE trips
                        SET trip_name = %s
                            , locations = %s
                            , description = %s
                            , image_url = %s
                            , likes = %s
                        WHERE id = %s
                        """,
                        # , likes = %s
                        #     , distance = %s
                        [
                            trip.trip_name,
                            trip.locations,
                            trip.description,
                            trip.image_url,
                            trip.likes,
                            # trip.distance,
                            trip_id,
                        ],
                    )
                    return self.trip_in_to_out(trip_id, trip)
        except Exception as e:
            print("error message:", e)
            return {"message": "Could not update trip"}

    def create_trip(self, trip: TripIn) -> TripOut:
        try:
            # connect to database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO trips
                            (trip_name, locations, description, created_on)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            trip.trip_name,
                            trip.locations,
                            trip.description,
                            trip.created_on,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.trip_in_to_out(id, trip)
        except Exception:
            return {"message": "Create did not work"}

    def get_bars_for_trip(self, trip_id: int):
        try:
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                with conn.cursor() as db:
                    bars = []
                    result = db.execute(
                        """
                        SELECT b.id AS bar_id, b.yelp_id, b.bar_name,
                        b.url, b.lat, b.long, b.image_url,
                        t.id AS trip_id, t.trip_name, t.locations,
                        t.description, t.created_on, t.image_url,
                        t.likes, t.distance, tb.positions
                        FROM trip_bars AS tb
                        JOIN bars AS b ON b.id = tb.bar_id
                        JOIN trips AS t ON t.id = tb.trip_id
                        WHERE tb.trip_id = %s
                        ORDER BY tb.positions;
                        """,
                        [trip_id],
                    )

                    for record in result:
                        bars.append(
                            BarOutWithPosition(
                                bar_id=record[0],
                                yelp_id=record[1],
                                bar_name=record[2],
                                url=record[3],
                                lat=record[4],
                                long=record[5],
                                image_url=record[6],
                                position=record[15],
                            )
                        )
                    trip = TripOut(
                        id=record[7],
                        trip_name=record[8],
                        locations=record[9],
                        description=record[10],
                        created_on=record[11],
                        image_url=record[12],
                        likes=record[13],
                        distance=record[14],
                    )
                    trip.locations = bars
                    return trip

        except Exception:
            return {"message": "trip does not exist"}

    def get_all_trips(self) -> Union[List[TripOut], Error]:
        try:
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                with conn.cursor() as db:
                    trips = []
                    trips_dict = {}
                    result = db.execute(
                        """
                            SELECT t.id AS trip_id
                            FROM trip_bars AS tb
                            JOIN bars AS b ON b.id = tb.bar_id
                            JOIN trips AS t ON t.id = tb.trip_id
                            ORDER BY tb.positions;
                            """
                    )
                    for record in result:
                        unique_tripid = record[0]
                        if unique_tripid not in trips_dict:
                            trips_dict[unique_tripid] = 1
                        else:
                            trips_dict[unique_tripid] += 1
                    for trip in trips_dict:
                        indiv_trip = self.get_bars_for_trip(trip)
                        trips.append(indiv_trip)
                    return trips
        except Exception:
            return {"message": "trip does not exist"}

    def trip_in_to_out(self, id: int, trip: TripIn):
        old_data = trip.dict()
        return TripOut(id=id, **old_data)

    def record_to_trip_out(self, record):
        return TripOut(
            id=record[0],
            trip_name=record[1],
            locations=record[2],
            description=record[3],
            created_on=record[4],
            image_url=record[5],
            likes=record[6],
            distance=record[7],
        )
