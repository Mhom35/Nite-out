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

Split up into groups. Tyler and I tried to make the creation page for creating a trip, but ran into some issues and found that we couldn’t proceed without implementing redux to manage our state.

## November 28, 2022

Spent the whole afternoon trying to figure out our last couple endpoints with James. Managed to complete the update, and after class we worked as a group on the get all bars endpoint

## November 23, 2022

Got some clarification and assistance on how to implement updating and deleting of bar data.

## November 22, 2022

Stayed up late as a group to debug and finish reworking a majority of our endpoints. Figured out the error from the previous day, and finally got our endpoints in a spot where we can think about moving on to the next steps, like auth and React.

## November 21, 2022

Discovered that we needed to rework our endpoints and add some more for being able to manipulate data about the bars. Tried to make progress on that but ran into a vague and unclear syntax error that blocked us for the rest of the night.

## November 19, 2022

I finished the basic 5 endpoints for the trips microservice: get all, create, get one, update, and delete.

## November 18, 2022

Finally got our accounts and trips databases set up and working correctly. Successfully implemented accounts microservice.

## November 17, 2022

We got our heatmap working, and reconfigured our yaml file to allow us to log on to pg-admin and create our server and view our database.

## November 16, 2022

Today, I completed the project setup, adding the .gitignore file to account for users with different operating systems. Added the PostgreSQL database required files: script file, dockerfile, edited docker-compose yaml.

## November 15, 2022

Today, we decided to each review FastAPI to get a better understanding of how to implement it with our endpoints. Also will add the API file contents to the readme.
