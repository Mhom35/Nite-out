### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

## Sign Up
* Endpoint path: /token
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response body (JSON):
    ```json
    {
      "email": string,
      "user name" : string,
      "password" : string,
      "password2": string,
    }
    ```

## Create a Trip
* Endpoint path: /trips
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "trip name": string,
      "locations" : [string],
      "description" : string,
    }
    ```

* Response: Create a trip
* Response shape (JSON):
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```

## List popular Trips
* Endpoint path: /trips
* Endpoint method:GET
* Query parameters:
  * top rated trips: see the top trips

* Headers:
  * Authorization: Bearer token

* Response: A list of trips
* Response shape (JSON):
     ```json
    {
      "trips": [
        {
          "account_name": string,
          "trip name": string,
          "locations" : [string],
          "avatar_url": string,
          "desription": string,
          "likes": number,
        }
      ]
    }
    ```

## Details
* Endpoint path: /trips/:id
* Endpoint method: GET
* Query parameters:
  * id: connect trip to id number

* Headers:
  * Authorization: Bearer token

* Response shape (JSON):
    ```json
        {
          "account_name": string,
          "trip name": string,
          "locations" : [string],
          "avatar_url": string,
          "desription": string,
          "image_url": string,
          "likes": number,
          "distance": number,
        }
    ```

* Response: See a trip


## Delete
* Endpoint path: /trips/:id
* Endpoint method: Delete
* Query parameters:
  * id: connect trip to id number

* Headers:
  * Authorization: Bearer token

* Response shape (JSON):
    ```json
    true
    ```
* Response: Always True

## Update
* Endpoint path: /trips/:id
* Endpoint method: PUT
* Query parameters:
  * id: connect trip to id number

* Headers:
  * Authorization: Bearer token

* Response shape (JSON):
    ```json
        {
          "trip name": string,
          "locations" : [string],
          "desription": string,
          "image_url": string,
          "distance": number,
        }
    ```

* Response: Update a trip
