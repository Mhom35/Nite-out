from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class BarIn(BaseModel):
    yelp_id: str
    bar_name: str
    url: str
    lat: float
    long: float
    price: str


class BarOut(BaseModel):
    id: int
    yelp_id: str
    bar_name: str
    url: str
    lat: float
    long: float
    price: str

class BarOutWithPosition(BaseModel):
    id: int
    yelp_id: str
    bar_name: str
    url: str
    lat: float
    long: float
    price: str
    position: int


class BarsRepository:
    def get_bar(self, yelp_id: str) -> Optional[BarOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT *
                        FROM bars
                        WHERE yelp_id = %s
                        """,
                        [yelp_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_bar_out(record)
        except Exception as e:
            print(e)
            return {"message": "BAR DON'T EXIST"}

    def get_all_bars(self) -> Union[List[BarOut], Error]:
        try:
            # connect to database
            with pool.connection() as conn:
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT *
                        FROM bars
                        """
                    )
                    return [
                        self.record_to_bar_out(record) for record in result
                    ]
        except Exception as e:
            print("error message:", e)
            return {"message": "Could not get all bars"}

    def create_bar(self, bar: BarIn) -> BarOut:
        try:
            # connect to database
            with pool.connection() as conn:
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO bars (
                            yelp_id,
                            bar_name,
                            url,
                            lat,
                            long,
                            price
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            bar.yelp_id,
                            bar.bar_name,
                            bar.url,
                            bar.lat,
                            bar.long,
                            bar.price
                        ],
                    )

                    id = result.fetchone()[0]
                    # Return new data
                    # old_data = trip.dict()
                    return self.bar_in_to_out(id, bar)

        except Exception:
            return {"message": "Create did not work"}

    def bar_in_to_out(self, id: int, bar: BarIn):
        old_data = bar.dict()
        return BarOut(id=id, **old_data)

    def record_to_bar_out(self, record):
        return BarOut(
            id=record[0],
            yelp_id=record[1],
            bar_name=record[2],
            url=record[3],
            lat=record[4],
            long=record[5],
            price=record[6],
        )
