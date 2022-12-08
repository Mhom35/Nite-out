## December 6, 2022

We fixed minor bugs in the sign up and login, and merged to main. Then we added logout functionality. I created the NavBar and Landing page components, and fixed an issue with navigate not functioning as intended by calling it within a useEffect.

## December 5, 2022

Successfully implemented front end authentication as a group and achieved login and sign up functionality.

## December 3, 2022

I was finally successful in implementing the navigation from the list of top trips, to a details page for each of those trips. Had to utilize redux to pass the state from the list page to the detail page.

## December 2, 2022

Worked as a group to refactor the backend so that our frontend didn’t have to hit the yelp API which was causing a preflight CORS error. Created a new endpoint on the backend that our frontend can hit to bypass the CORS issue. Spent the rest of the evening trying, unsuccessfully, to figure out how to manage the state of a trip’s id for the dynamic routing.

## December 1, 2022

Finished the create trip form by using redux to manage the state of each bar/location in the map component, to then be used in the form component. Started on a trip details page that would be linked to from the list of top trips, but can’t figure out yet how to set up the navigation to dynamically route to the correct trip id.

## November 30, 2022

Finally figured out how to implement backend auth into our other microservice. We spent 6 hours trying to fix CORS errors and ended up having to refactor one of our create methods in the process.

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
