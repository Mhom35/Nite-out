from fastapi import FastAPI
from routers import trips, bars,tripBars


app = FastAPI()
app.include_router(trips.router)
app.include_router(bars.router)
app.include_router(tripBars.router)
