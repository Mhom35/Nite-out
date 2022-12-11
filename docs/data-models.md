# Data models

---

## Trips microservice

### Trips

| name        | type     | unique | optional |
| ----------- | -------- | ------ | -------- |
| id          | int      | yes    | no       |
| trip_name   | string   | no     | no       |
| locations   | [string] | no     | no       |
| description | string   | no     | no       |
| created_on  | string   | no     | no       |
| image_url   | string   | no     | yes      |
| likes       | int      | no     | yes      |

The `trip` entity contains the data about a specific trip
that a user can create.

### Bars

| name      | type   | unique | optional |
| --------- | ------ | ------ | -------- |
| id        | int    | yes    | no       |
| yelp_id   | string | no     | no       |
| bar_name  | string | no     | no       |
| url       | string | no     | no       |
| lat       | int    | no     | no       |
| long      | int    | no     | no       |
| image_url | string | no     | no       |

The `bar` entity contains data about a bar that is added to a trip.

### Trip_bars

| name      | type | unique | optional |
| --------- | ---- | ------ | -------- |
| trip_id   | int  | yes    | no       |
| bar_id    | int  | yes    | no       |
| positions | int  | yes    | no       |

The `trip_bar` entity is used to establish the connection between a trip and the bars that a user adds to it. It also contains the positions (order) of the bars in a particular trip.

---

## Accounts Microservice

### Accounts

| name            | type   | unique | optional |
| --------------- | ------ | ------ | -------- |
| id              | int    | yes    | no       |
| email           | string | yes    | no       |
| hashed_password | string | no     | no       |
| username        | string | yes    | no       |

The `accounts` entity contains the information of each account that is added to the database.
