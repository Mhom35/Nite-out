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
import time

def current_milli_time():
    return round(time.time() * 1000)

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
    account: int
    username: Optional[str]


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

    def update_trip(self, account_id: int, trip_id: int, trip: TripIn) -> Union[TripOut, Error]:
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
                    return self.trip_in_to_out(trip_id, trip, account_id)
        except Exception as e:
            print("error message:", e)
            return {"message": "Could not update trip"}

    def create_trip(self, account_id: int, username: str, trip: TripIn) -> TripOut:
        try:
            # connect to database
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO trips
                            (trip_name, locations, description, created_on, account, username)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)

                        RETURNING id;
                        """,
                        [
                            trip.trip_name,
                            trip.locations,
                            trip.description,
                            trip.created_on,
                            account_id,
                            username
                        ],
                    )
                    id = result.fetchone()[0]
                    result = self.trip_in_to_out(id, trip, account_id, username)
                    return result
        except Exception:
            return {"message": "Create did not work"}

    def get_bars_for_trip(self, trip_list: list):
        try:
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                with conn.cursor() as db:
                    # 
                    new_dict = {}
                    output = []
                    result = db.execute(
                        """
                        SELECT b.id AS bar_id, b.yelp_id, b.bar_name,
                        b.url, b.lat, b.long, b.image_url,
                        t.id AS trip_id, t.trip_name, t.locations,
                        t.description, t.created_on, t.image_url,
                        t.likes, t.distance, tb.positions, t.account, t.username
                        FROM trip_bars AS tb
                        JOIN bars AS b ON b.id = tb.bar_id
                        JOIN trips AS t ON t.id = tb.trip_id
                        WHERE tb.trip_id = ANY (%s)
                        ORDER BY tb.positions;
                        """,
                        [trip_list],
                    )


                    for trip in result:
                        # trip id 

                        print("trip", trip)
                        if trip[7] not in new_dict:
                            new_dict[trip[7]] = TripOut(
                                id=trip[7],
                                trip_name=trip[8],
                                locations=[BarOutWithPosition(
                                    bar_id=trip[0],
                                    yelp_id=trip[1],
                                    bar_name=trip[2],
                                    url=trip[3],
                                    lat=trip[4],
                                    long=trip[5],
                                    image_url=trip[6],
                                    position=trip[15],
                                )],
                                description=trip[10],
                                created_on=trip[11],
                                image_url=trip[12],
                                likes=trip[13],
                                distance=trip[14],
                                account=trip[16],
                                username=trip[17],
                            )
                        else:
                            new_dict[trip[7]].locations.append(
                                BarOutWithPosition(
                                    bar_id=trip[0],
                                    yelp_id=trip[1],
                                    bar_name=trip[2],
                                    url=trip[3],
                                    lat=trip[4],
                                    long=trip[5],
                                    image_url=trip[6],
                                    position=trip[15],
                                )

                            )
                        print("here")

                    
                    return list(new_dict.values())

        except Exception:
            return {"message": "trip does not exist"}

    def get_all_trips(self) -> Union[List[TripOut], Error]:
        start = current_milli_time()
        try:
            with connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs) as conn:  # noqa: E501
                with conn.cursor() as db:
                    trips = []
                    result = db.execute(
                        """
                            SELECT t.id AS trip_id
                            FROM trip_bars AS tb
                            JOIN bars AS b ON b.id = tb.bar_id
                            JOIN trips AS t ON t.id = tb.trip_id
                            ORDER BY tb.positions;
                            """
                    )
                    result_hash = set(result)
                    all_trip_ids = [trip[0] for trip in result_hash]
                    trips = self.get_bars_for_trip(all_trip_ids)
                    elapsed = current_milli_time() - start
                    print(elapsed)
                    return trips  
        except Exception:
            return {"message": "trip does not exist"}

    def get_individual_trip(self, trip_id: int):
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
                        t.likes, t.distance, tb.positions, t.account, t.username
                        FROM trip_bars AS tb
                        JOIN bars AS b ON b.id = tb.bar_id
                        JOIN trips AS t ON t.id = tb.trip_id
                        WHERE tb.trip_id = %s
                        ORDER BY tb.positions;
                        """,
                        [trip_id],
                    )

                    for record in result:
                        print("record--->", record)
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
                        account=record[16],
                        username=record[17]
                    )
                    
                    trip.locations = bars
                    return trip
        except Exception:
            return {"message": "trip does not exist"}



    def trip_in_to_out(self, id: int, trip: TripIn, account_id: int, username: str):
        old_data = trip.dict()
        return TripOut(id=id, account=account_id, username=username, **old_data)

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
            account=record[8],
            username=record[9],
        )

    
