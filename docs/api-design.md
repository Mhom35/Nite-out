### Log in

- Endpoint path: /token
- Endpoint method: POST

- Request shape (form):

  - username: string
  - password: string

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "account": {
      «key»: type»,
    },
    "token": string
  }
  ```

### Log out

- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

## Sign Up

- Endpoint path: /token
- Endpoint method: POST

- Response: Always true
- Response body (JSON):
  ```json
  {
    "email": string,
    "username": string,
    "password": string,
  }
  ```

## Create a Trip

- Endpoint path: /trips
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body (JSON):

  ```json
  {
    "trip name": string,
    "locations" : [string],
    "description" : string,
  }
  ```

- Response: Create a trip
- Response shape (JSON):
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

## List popular Trips

- Endpoint path: /trips
- Endpoint method:GET
- Query parameters:

  - top rated trips: see the top trips

- Headers:

  - Authorization: Bearer token

- Response: A list of trips
- Response shape (JSON):
  ```json
  {
   "trips": [
     {
       "account_name": string,
       "trip name": string,
       "locations" : [string],
       "avatar_url": string,
       "description": string,
       "likes": number,
     }
   ]
  }
  ```

## Details

- Endpoint path: /trips/:id
- Endpoint method: GET
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

## Delete

- Endpoint path: /trips/:id
- Endpoint method: Delete
- Query parameters:

  - id: connect trip to id number

- Headers:

  - Authorization: Bearer token

- Response shape (JSON):
  ```json
  true
  ```
- Response: Always True

## Update

- Endpoint path: /trips/:id
- Endpoint method: PUT
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

## User's trips

- Endpoint path: /account/trips
- Endpoint method:GET
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

## Uber

- Endpoint path: /v1.2/estimates/price
- Endpoint method: GET
- Query parameters:

| NAME                 | TYPE  | DESCRIPTION                                                                |
| -------------------- | ----- | -------------------------------------------------------------------------- |
| start_latitude       | float | Latitude component of start location.                                      |
| start_longitude      | float | Longitude component of start location.                                     |
| end_latitude         | float | Latitude component of end location.                                        |
| end_longitude        | float | Longitude component of end location.                                       |
| seat_count(optional) | int   | The number of seats required for uberPOOL. Default and maximum value is 2. |

- Example Request:
  To use a user access token:

```json
    curl -H 'Authorization: Bearer <USER_ACCESS_TOKEN>' \
        -H 'Accept-Language: en_US' \
        -H 'Content-Type: application/json' \
        'https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075'
```

- Response body (JSON):
  ```json
  {
    "prices": [
      {
        "localized_display_name": "POOL",
        "distance": 6.17,
        "display_name": "POOL",
        "product_id": "26546650-e557-4a7b-86e7-6a3942445247",
        "high_estimate": 15,
        "low_estimate": 13,
        "duration": 1080,
        "estimate": "$13-14",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "uberX",
        "distance": 6.17,
        "display_name": "uberX",
        "product_id": "a1111c8c-c720-46c3-8534-2fcdd730040d",
        "high_estimate": 17,
        "low_estimate": 13,
        "duration": 1080,
        "estimate": "$13-17",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "uberXL",
        "distance": 6.17,
        "display_name": "uberXL",
        "product_id": "821415d8-3bd5-4e27-9604-194e4359a449",
        "high_estimate": 26,
        "low_estimate": 20,
        "duration": 1080,
        "estimate": "$20-26",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "SELECT",
        "distance": 6.17,
        "display_name": "SELECT",
        "product_id": "57c0ff4e-1493-4ef9-a4df-6b961525cf92",
        "high_estimate": 38,
        "low_estimate": 30,
        "duration": 1080,
        "estimate": "$30-38",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "BLACK",
        "distance": 6.17,
        "display_name": "BLACK",
        "product_id": "d4abaae7-f4d6-4152-91cc-77523e8165a4",
        "high_estimate": 43,
        "low_estimate": 43,
        "duration": 1080,
        "estimate": "$43.10",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "SUV",
        "distance": 6.17,
        "display_name": "SUV",
        "product_id": "8920cb5e-51a4-4fa4-acdf-dd86c5e18ae0",
        "high_estimate": 63,
        "low_estimate": 50,
        "duration": 1080,
        "estimate": "$50-63",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "ASSIST",
        "distance": 6.17,
        "display_name": "ASSIST",
        "product_id": "ff5ed8fe-6585-4803-be13-3ca541235de3",
        "high_estimate": 17,
        "low_estimate": 13,
        "duration": 1080,
        "estimate": "$13-17",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "WAV",
        "distance": 6.17,
        "display_name": "WAV",
        "product_id": "2832a1f5-cfc0-48bb-ab76-7ea7a62060e7",
        "high_estimate": 33,
        "low_estimate": 25,
        "duration": 1080,
        "estimate": "$25-33",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "TAXI",
        "distance": 6.17,
        "display_name": "TAXI",
        "product_id": "3ab64887-4842-4c8e-9780-ccecd3a0391d",
        "high_estimate": null,
        "low_estimate": null,
        "duration": 1080,
        "estimate": "Metered",
        "currency_code": null
      }
    ]
  }
  ```
- Response:

| NAME                   | TYPE   | DESCRIPTION                                                                                                                                                                         |
| ---------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| product_id             | string | Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles. |
| currency_code          | string | ISO 4217 currency code.                                                                                                                                                             |
| display_name           | string | Display name of product.                                                                                                                                                            |
| localized_display_name | string | Localized display name of product.                                                                                                                                                  |
| estimate               | string | Formatted string of estimate in local currency of the start location. Estimate could be a range, a single number (flat rate) or “Metered” for TAXI.                                 |
| minimum                | int    | Minimum price for product.                                                                                                                                                          |
| low_estimate           | int    | Lower bound of the estimated price                                                                                                                                                  |
| high_estimate          | int    | Upper bound of the estimated price.                                                                                                                                                 |
| surge_multiplier       | float  | Expected surge multiplier. Surge is active if surge_multiplier is greater than 1. Price estimate already factors in the surge multiplier.                                           |
| duration               | int    | Expected activity duration (in seconds). Always show duration in minutes.                                                                                                           |
| distance               | float  | Expected activity distance (in miles).                                                                                                                                              |
