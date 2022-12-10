# APIs

## Authentication

### Get Token

- Endpoint path: `/token`
- Endpoint method: `GET`

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

Output:

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

## Trips

### Get all trips

- Endpoint path: `/trips`
- Endpoint method: `GET`

```json
[
  {
    "id": 0,
    "trip_name": "string",
    "locations": ["string"],
    "description": "string",
    "created_on": "2022-12-09T22:49:39.028Z",
    "image_url": "string",
    "likes": 0,
    "distance": 0
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
  "locations": ["string"],
  "description": "string",
  "created_on": "2022-12-09T22:51:05.143Z",
  "image_url": "string",
  "likes": 0
}
```

Output:

```json
{
  "id": 0,
  "trip_name": "string",
  "locations": ["string"],
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
  "id": 0,
  "trip_name": "string",
  "locations": ["string"],
  "description": "string",
  "image_url": "string",
  "likes": 0
}
```

Output:

```json
{
  "id": 0,
  "trip_name": "string",
  "locations": ["string"],
  "description": "string",
  "created_on": "2022-12-09T22:57:54.259Z",
  "image_url": "string",
  "likes": 0
}
```

## Delete A Trip

- Endpoint path: `/trips/{trip_id}`
- Endpoint method: `Delete`
- Query parameters:

  - id: connect trip to id number

- Headers:

  - Authorization: Bearer token

- Response shape (JSON):

  ```json
      {
        "account_name": string,
        "trip name": string,
        "locations" : [string],
        "avatar_url": string,
        "description": string,
        "image_url": string,
        "likes": number,
        "distance": number,
      }
  ```

- Response: See a trip

## Get Trip Bars

- Endpoint path: `/trips/{trip_id}/getbars`
- Endpoint method: `GET`
- Query parameters:

  - id: connect trip to id number

- Headers:

  - Authorization: Bearer token

- Response shape (JSON):
  ```json
  true
  ```
- Response: Always True

## Create Bar

- Endpoint path: `/bars/new`
- Endpoint method: `POST`
- Query parameters:

  - id: connect trip to id number

- Headers:

  - Authorization: Bearer token

- Response shape (JSON):

  ```json
      {
        "trip name": string,
        "locations" : [string],
        "description": string,
        "image_url": string,
        "distance": number,
      }
  ```

- Response: Update a trip

## Add New Bar

- Endpoint path: `/bars/add/{yelp_id}`
- Endpoint method: `POST`
- Query parameters:

  - your trips: see your created trips

- Headers:

  - Authorization: Bearer token

- Response: A users list of trips
- Response shape (JSON):
  ```json
  {
   "trips": [
     {
       "trip name": string,
       "locations" : [string],
       "description": string,
       "likes": number,
     }
   ]
  }
  ```

## Get Bars List

- Endpoint path:`/api/bars`
- Endpoint method:`GET`

## Get All Bar

- Endpoint path:`/bars`
- Endpoint method:`GET`

## Get One Bar

- Endpoint path:`/bars/{yelp_id}`
- Endpoint method:`GET`

## Create Middle Table

- Endpoint path:`/middletable`
- Endpoint method:`POST`

## Delete Bar From Trip

- Endpoint path:`/trips/{trip_id}/delete-bar-connection/{bar_id}`
- Endpoint method:`DELETE`

## Update Bars For Trips

- Endpoint path:`/trips/{trip_id}/delete-bar-connection/{bar_id}`
- Endpoint method:`PUT`

## Yelp

- Endpoint path: https://api.yelp.com/v3/categories/{alias}
- Endpoint method: GET
- Query parameters:

  - locale(string) : Optional. Specify the locale to return the event information in.
  - alias(string) : Required. Specify the alias of the category.

- Response body (JSON):
  ```json
  {
    "category": {
      "alias": "beer",
      "title": "drinks",
      "parent_aliases": ["bar"],
      "country_whitelist": [],
      "country_blacklist": []
    }
  }
  ```
- Response:

| NAME              | TYPE     | DESCRIPTION                                       |
| ----------------- | -------- | ------------------------------------------------- |
| alias             | string   | Category alias.                                   |
| title             | string   | Title of this category.                           |
| parent_aliases    | string[] | List of aliases of parent categories.             |
| country_whitelist | string[] | Countries for which this category is whitelisted. |
| country_blacklist | string[] | Countries for which this category is blacklisted. |
