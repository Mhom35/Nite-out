# APIs

---

## Authentication

### Get Token

- Endpoint path: `/token`
- Endpoint method: `GET`

Successful Response:

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 1,
    "email": "example@example.com",
    "username": "user1"
  }
}
```

### Log In

- Endpoint path: `/token`
- Endpoint method: `POST`

Input:

```json
{
  "username": "user1",
  "password": "example@example.com"
}
```

Output:

```json
{
  "access_token": "string",
  "token_type": "Bearer"
}
```

### Log Out

- Endpoint path: `/token`
- Endpoint method: `DELETE`

Successful Response:

```json
true
```

### Create Account

- Endpoint path: `/api/accounts`
- Endpoint method: `POST`

Input:

```json
{
  "email": "example@example.com",
  "username": "user1",
  "password": "password"
}
```

Successful Response:

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 1,
    "email": "example@example.com",
    "username": "user1"
  }
}
```

---

## Trips

### Get all trips

- Endpoint path: `/trips`
- Endpoint method: `GET`

Successful Response:

```json
[
  {
    "id": 0,
    "trip_name": "string",
    "locations": [
      {
        "bar_id": 1,
        "yelp_id": "string",
        "bar_name": "string",
        "url": "string",
        "lat": 37.820673,
        "long": -122.3750203,
        "image_url": "string",
        "position": 0
      }
    ],
    "description": "string",
    "created_on": "2022-12-09T22:49:39.028Z",
    "image_url": "string",
    "likes": 0
  }
]
```

### Create a Trip

- Endpoint path: `/trips`
- Endpoint method: `POST`

Input:

```json
{
  "trip_name": "string",
  "locations": [
    {
      "bar_id": 1,
      "yelp_id": "string",
      "bar_name": "string",
      "url": "string",
      "lat": 37.820673,
      "long": -122.3750203,
      "image_url": "string",
      "position": 0
    }
  ],
  "description": "string",
  "created_on": "2022-12-10T01:16:46.376Z",
  "image_url": "string",
  "likes": 0
}
```

Successful Response:

```json
{
  "id": 0,
  "trip_name": "string",
  "locations": [
    {
      "bar_id": 1,
      "yelp_id": "string",
      "bar_name": "string",
      "url": "string",
      "lat": 37.820673,
      "long": -122.3750203,
      "image_url": "string",
      "position": 0
    }
  ],
  "description": "string",
  "created_on": "2022-12-09T22:51:05.150Z",
  "image_url": "string",
  "likes": 0
}
```

### Update Trip

- Endpoint path: `/trips/{trip_id}`
- Endpoint method:`PUT`
- Query parameters:

Input:

```json
{
  "id",
  "trip_name": "string",
  "locations": [
    {
        "bar_id": 1,
        "yelp_id": "string",
        "bar_name": "string",
        "url": "string",
        "lat": 37.820673,
        "long": -122.3750203,
        "image_url": "string",
        "position": 0
      }
  ],
  "description": "string",
  "created_on": "2022-12-10T01:17:30.761Z",
  "image_url": "string",
  "likes": 0
}
```

Successful Response:

```json
{
  "id": 0,
  "trip_name": "string",
  "locations": [
    {
      "bar_id": 1,
      "yelp_id": "string",
      "bar_name": "string",
      "url": "string",
      "lat": 37.820673,
      "long": -122.3750203,
      "image_url": "string",
      "position": 0
    }
  ],
  "description": "string",
  "created_on": "2022-12-10T01:17:30.762Z",
  "image_url": "string",
  "likes": 0,
  "distance": 0
}
```

## Delete A Trip

- Endpoint path: `/trips/{trip_id}`
- Endpoint method: `DELETE`

Input:

```json
{
  "id": 0
}
```

Successful Response:

```json
true
```

## Get Trip Details

- Endpoint path: `/trips/{trip_id}/getbars`
- Endpoint method: `GET`

Input:

```json
{
  "id": 1
}
```

Successful Response:

```json
{
  "id": 0,
  "trip_name": "string",
  "locations": [
    {
      "bar_id": 64,
      "yelp_id": "xAALy_s3a1dT6K09vSrAGQ",
      "bar_name": "Mersea",
      "url": "https://www.yelp.com/biz/mersea-san-francisco-4?adjust_creative=LqG002GDc6J0d7QGc1y7Qw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=LqG002GDc6J0d7QGc1y7Qw",
      "lat": 37.820673,
      "long": -122.3750203,
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/B0DqXHqXvGSRyetqoZ4VyQ/o.jpg",
      "position": 0
    }
  ],
  "description": "string",
  "created_on": "2022-12-10T01:31:28.068Z",
  "image_url": "string",
  "likes": 0,
  "distance": 0
}
```

- Response shape (JSON):
  ```json
  true
  ```
- Response: Always True

## Add New Bar

- Endpoint path: `/bars/add/{yelp_id}`
- Endpoint method: `POST`

Input:

```json
{
  "yelp_id": "xAALy_s3a1dT6K09vSrAGQ",
  "bar_name": "Mersea",
  "url": "https://www.yelp.com/biz/mersea-san-francisco-4?adjust_creative=LqG002GDc6J0d7QGc1y7Qw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=LqG002GDc6J0d7QGc1y7Qw",
  "lat": 37.820673,
  "long": -122.3750203,
  "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/B0DqXHqXvGSRyetqoZ4VyQ/o.jpg"
}
```

Successful Response:

```json
{
  "bar_id": 1,
  "yelp_id": "xAALy_s3a1dT6K09vSrAGQ",
  "bar_name": "Mersea",
  "url": "https://www.yelp.com/biz/mersea-san-francisco-4?adjust_creative=LqG002GDc6J0d7QGc1y7Qw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=LqG002GDc6J0d7QGc1y7Qw",
  "lat": 37.820673,
  "long": -122.3750203,
  "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/B0DqXHqXvGSRyetqoZ4VyQ/o.jpg"
}
```

## Get Bars List

- Endpoint path:`/api/bars`
- Endpoint method:`GET`

Input:

```json
{
  "latitude": 37.80025542866086,
  "longitude": -122.40962076757808
}
```

Successful Response

```json
{
  "businesses": [
    {
      "id": "5g-rHq-WXf9UiN-BEc8AcQ",
      "name": "Third Rail",
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/jxMO6J7CAaitjK7sLdDx3Q/o.jpg",
      "url": "https://www.yelp.com/biz/third-rail-san-francisco?adjust_creative=LqG002GDc6J0d7QGc1y7Qw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=LqG002GDc6J0d7QGc1y7Qw",
      "coordinates": {
        "latitude": 37.7606207,
        "longitude": -122.3881324
      }
    }
  ]
}
```

## Get All Bar

- Endpoint path:`/bars`
- Endpoint method:`GET`

Successful Response:

```json
[
  {
    "bar_id": 1,
    "yelp_id": "xAALy_s3a1dT6K09vSrAGQ",
    "bar_name": "Mersea",
    "url": "https://www.yelp.com/biz/mersea-san-francisco-4?adjust_creative=LqG002GDc6J0d7QGc1y7Qw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=LqG002GDc6J0d7QGc1y7Qw",
    "lat": 37.820673,
    "long": -122.3750203,
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/B0DqXHqXvGSRyetqoZ4VyQ/o.jpg"
  }
]
```

## Get One Bar

- Endpoint path:`/bars/{yelp_id}`
- Endpoint method:`GET`

Input:

```json
{
  "yelp_id": "xAALy_s3a1dT6K09vSrAGQ"
}
```

Successful Response:

```json
{
  "bar_id": 1,
  "yelp_id": "xAALy_s3a1dT6K09vSrAGQ",
  "bar_name": "Mersea",
  "url": "https://www.yelp.com/biz/mersea-san-francisco-4?adjust_creative=LqG002GDc6J0d7QGc1y7Qw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=LqG002GDc6J0d7QGc1y7Qw",
  "lat": 37.820673,
  "long": -122.3750203,
  "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/B0DqXHqXvGSRyetqoZ4VyQ/o.jpg"
}
```

## Create Middle Table

- Endpoint path:`/middletable`
- Endpoint method:`POST`

This endpoint is hit when a user wants to add a bar to their trip. The bar_id of the bar is added to the particular trip, along with the position of the bar in the list.

Input and Response:

```json
{
  "trip_id": 5,
  "bar_id": 12,
  "positions": 1
}
```

## Delete Bar From Trip

- Endpoint path:`/trips/{trip_id}/delete-bar-connection/{bar_id}`
- Endpoint method:`DELETE`

Input:

```json
{
  "trip_id": 5,
  "bar_id": 12
}
```

Successful Response:

```json
true
```

## Update Bars For Trips

- Endpoint path:`/trips/{trip_id}/delete-bar-connection/{bar_id}`
- Endpoint method:`PUT`

This endpoint takes a trip_id and deletes the bars and positions from it. Then it adds the newly rearranged positions of each bar back to the trip to update the trip's bars.

Input:

```json
{
  "trip_id": 5,
  "locations": [
    {
      "bar_id": 12,
      "positions": 1
    }
    {
      "bar_id": 6,
      "positions": 2
    }
  ]
}
```

Successful Response:

```json
{
  "trip_id": 5,
  "locations": [
    {
      "bar_id": 6,
      "positions": 1
    }
    {
      "bar_id": 12,
      "positions": 2
    }
  ]
}
```
