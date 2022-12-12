## December 12, 2022

Added in the heatmap component from earlier. Using a useRef to lock our map we will be able to fly to different cities. All data comes from populartimes repo on github (via googleplaces api)

## December 9, 2022

Changed babel compiler in ghi package.json so that in production we wont have compiling errors. (newer mapbox doesnt work on certain browswers)

"browserslist": {
"production": [
">0.2%, not dead, not ie 11, not chrome < 51, not safari < 10, not android < 51",

## December 8, 2022

Changed the location to state to get rid of first click undefined. Invalid token was reffering to mapbox token, so we fixed it by changing the environment varibles in gitlab yaml

## December 7, 2022

Ran out of minutes on gitlab so progress was slow. But started CD as a group and had to change a lot of our yaml files to get to a deployed state. Still ran into deployment issues where addLocation will not work as intended.

## December 6, 2022

We fixed minor bugs in the sign up and login, and merged to main. Then we added logout functionality. Led group to have like functionality and sorting by likes functionality.

## December 5, 2022

Successfully implemented front end authentication as a group and achieved login and sign up functionality.

## December 3, 2022

Succesfully implemented redux to autorefetch data for get all trips after an updated trip. Will refetch based on the id.

## December 2, 2022

Worked as a group to refactor the backend so that our frontend didn’t have to hit the yelp API which was causing a preflight CORS error. This was done by recreating an endpoint to fetch yelp businesses via the search params that yelp fusion api asks us to provide. Then I finished the edit page to update the trip correctly.

## December 1, 2022

Finished the create trip form by using redux to manage the state of each bar/location in the map component, to then be used in the form component. Started the edit page to dynamically change bars of a trip based on order. This was done by using the pangea dnd; with draggable and droppable components; need to splice the list to replace/ swap values.

## November 30, 2022

Finally figured out how to implement backend auth into our other microservice. Ran into cors preflight error when trying to pull from yelp fusion api. Found a work around for that via We spent 6 hours trying to fix CORS errors and ended up having to refactor one of our create methods in the process.

## November 29, 2022

Finished up the GeoMap page, implemented GeoCoders(that creates that search functionality). Used useStates, useRef, useEffect to move marker to searched location (with a fly to functionality). This ended up being our

## November 28, 2022

Spent the whole afternoon trying to figure out our last couple endpoints with James. Managed to complete the update, and after class we worked as a group on the get all bars endpoint

## November 23, 2022

Update and deleting a bar from a trip required a many to many association. Got some assistance on how to implement that.

## November 22, 2022

Stayed up late as a group to debug and finish reworking a majority of our endpoints. Figured out the error from the previous day and endpoints were sufficient enough to proceed to implementing auth and frontend. Worked on map component (Geomap) to implement search capabilities.

## November 21, 2022

Worked with an instructor to rework our backend to attach bars to a trip via a sql injection. Tried to make progress on that but ran into a vague and unclear syntax error (sql based issue regarding "," and "%") that blocked us for the rest of the night.

## November 19, 2022

Finished heatmap and pulling data from google place api. Just need to fix the UI experience to make circles show up at a certain zoom.

## Nov 18, 2022 ------

Worked on setting up accounts/ sign up/ sign in /etc.

## Nov 17, 2022

Worked on setting up users.

## Nov 16, 2022

Worked on heatmap got working layers to show correctly. Big Breakthroughs in terms of getting the data to show up correctly.

## Nov 15, 2022

Work on fast api understanding, and copy mvp into readme. Worked on heatmap integration.!
