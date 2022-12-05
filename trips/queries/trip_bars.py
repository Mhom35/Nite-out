from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class TripBarIn(BaseModel):
    trip_id: int
    bar_id: int
    positions: int


class TripBarOut(BaseModel):
    trip_id: int
    bar_id: int
    positions: int

class UpdateLocationIn(BaseModel):
    locations: list


class TripBarRepository:
    def create_trip_bar(self, trip_bars: TripBarIn) -> TripBarOut:
        try:
            # connect to database
            with pool.connection() as conn:
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO trip_bars (
                            trip_id,
                            bar_id,
                            positions
                        )
                        VALUES
                            (%s, %s, %s)
                        RETURNING trip_id, bar_id, positions;
                        """,
                        [
                            trip_bars.trip_id,
                            trip_bars.bar_id,
                            trip_bars.positions,
                        ],
                    )
                    row = result.fetchone()
                    ## return success if this works
                    return {
                        "trip_id": row[0],
                        "bar_id": row[1],
                        "positions": row[2],
                    }

        except Exception:
            return {"message": "Create did not work"}

    def update_bars_for_trips(self, trip_id: int, locations: list[str]):
        parens = ""
        ids = []
        for i, bar_id in enumerate(locations):
            if i < len(locations) - 1:
                parens += "(%s, %s, %s), "
            else:
                parens += "(%s, %s, %s)"
            ids.append(trip_id)
            ids.append(bar_id)
            ids.append(i + 1)
        sequel1 = f"""
                DELETE FROM trip_bars
                WHERE trip_id = %s;
            """
        sequel2 = f"""
                INSERT INTO trip_bars
                    (trip_id, bar_id, positions)
                VALUES {parens};
            """
        try:
            # connect to database
            with pool.connection() as conn:
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    db.execute(
                        sequel1,
                        [trip_id],
                    )
                    db.execute(
                        sequel2,
                        ids,
                    )
                    return True

        except Exception as e:
            print("error message:", e)
            return {"message": "Could not update trip"}

    def delete_bar_from_trip(self, trip_id: int, bar_id: int):
        try:
            # connect to database
            with pool.connection() as conn:
                # get cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        DELETE FROM trip_bars
                        WHERE trip_id = %s AND bar_id = %s
                        """,
                        [trip_id, bar_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def trip_bar_in_to_out(self, tripBar: TripBarIn):
        old_data = tripBar.dict()
        return TripBarOut(**old_data)
