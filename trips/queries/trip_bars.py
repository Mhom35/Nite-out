from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool



class TripBarIn(BaseModel):
    trip_id: int
    bar_id: int

class TripBarOut(BaseModel):
    trip_id: int
    bar_id: int

class TripBarRepository:
    def create_trip_bar(self, trip_bars: TripBarIn)->TripBarOut:
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
                            bar_id
                        )
                        VALUES
                            (%s, %s)
                        """,
                        [
                            trip_bars.trip_id,
                            trip_bars.bar_id
                        ],
                    )
                    ## return success if this works
                    return {}


        except Exception:
            return {"message": "Create did not work"}
    def trip_bar_in_to_out(self, tripBar: TripBarIn):
        old_data = tripBar.dict()
        return TripBarOut(**old_data)
