from fastapi import FastAPI
from routers import accounts
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
import os

app = FastAPI()

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router)
app.include_router(authenticator.router)
