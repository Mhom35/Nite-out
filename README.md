# NiteOut

- Mitchell Hom
- Tyler Dempsey
- Derrick Wan

## Design

- [API design](docs/api-design.md)
- [Data model](docs/data-model.md)

## Intended Market

Anyone looking for bars to plan their next night out. Tourists looking for bars in the area, or locals looking to discover new bars.

## Functionality

- Our app allows users to plan their next bar hopping trip by using our interactive map to show the nearest 20 bars in a 50 mile radius.
- Users can create a new trip and add trips to their itinerary via a pop up on the map.
- A top trips list that shows a list of the trips with the most likes that others have created, and the ability to upvote trips after trying them out.
- Sign up for an account and log in before being able to create a trip.
- The ability to edit a trip and rearrange the order in which the different bars are visited.
- The option to delete a trip.

## Getting started

The following steps will detail how to start the application on your own computer locally, or you could head to our deployed project at https://niteout1.gitlab.io/nite-out

1. Clone the repository to your own computer.
2. CD into the new directory of the project.
3. Run `docker volume create pg-admin`
4. Run `docker volume create postgres-data`
5. Run `docker compose build`
6. Run `docker compose up`
7. Navigate to `localhost:3000` to start using the application.
