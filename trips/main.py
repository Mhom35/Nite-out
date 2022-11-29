from fastapi import FastAPI
from routers import trips, bars,tripBars


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trips.router)
app.include_router(bars.router)
app.include_router(tripBars.router)
