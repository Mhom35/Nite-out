from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.bars import (
    Error,
    BarIn,
    BarsRepository,
    BarOut,
)
from queries.requests_yelp import API_KEY, search_yelp
from queries.yelp_get_bars import bar_in_db

router = APIRouter()


API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'

@router.post("/bars/new/", response_model=Union[BarOut, Error])
def create_bar(
    bar: BarIn,
    response: Response,
    yelp_id: str,
    repo: BarsRepository = Depends(),
):
    return repo.create_bar(bar)


@router.post("/bars/add/{yelp_id}", response_model=Union[BarOut, Error])
def add_new_bar(
    bar: BarIn,
    response: Response,
    yelp_id: str,
    repo: BarsRepository = Depends(),
):
    return bar_in_db(API_KEY=API_KEY, yelp_id=yelp_id)

@router.get("/api/bars")
async def get_bars_list(
    latitude: float,
    longitude: float
):
    url = API_HOST + SEARCH_PATH
    url_params= {
        'term':"bar",
        'latitude': latitude,
        'longitude': longitude,
        'limit': 20,
    }
    return search_yelp(url, url_params)


@router.get("/bars", response_model=Union[List[BarOut], Error])
def get_all_bars(
    repo: BarsRepository = Depends(),
):
    return repo.get_all_bars()


# @router.put("/bars/{bar_id}", response_model=Union[BarOut, Error])
# def update_bar(
#     bar_id: str,
#     bar: BarIn,
#     repo: BarsRepository = Depends(),
# ) -> Union[BarOut, Error]:
#     return repo.update(bar_id, bar)


# @router.delete("/bars/{bar_id}", response_model=bool)
# def delete_bar(
#     bar_id: str,
#     repo: BarsRepository = Depends(),
# ) -> bool:
#     return repo.delete(bar_id)


@router.get("/bars/{yelp_id}", response_model=Optional[BarOut])
def get_one_bar(
    yelp_id: str,
    response: Response,
    repo: BarsRepository = Depends(),
) -> BarOut:
    bar = repo.get_bar(yelp_id)
    if bar is None:
        response.status_code = 404
    return bar


# @router.get("/bars/{id}")
# def getBusinessDetails(id: str):
#     data = get_business(API_KEY, id)
# data = fake_decode_token(token)
# if not data:
#     raise HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Invalid authentication credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
# return data
