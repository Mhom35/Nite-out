import * as React from "react";
// import Button from "@mui/material/Button";/
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { getTripId } from "./app/tripId";
import { useDispatch } from "react-redux";
import { useGetAllTripsQuery } from "./app/tripsApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useUpdateTripMutation } from "./app/tripsApi";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import * as Icon from 'react-bootstrap-icons';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import { useAddTripToWishListMutation }  from "./app/favoritesAPI";
import Alert from 'react-bootstrap/Alert';
import { useAuthContext } from "./frontendAuth";


const theme = createTheme();

export default function TopTrips() {
  const { data: barData, isLoading } = useGetAllTripsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateTrip, result] = useUpdateTripMutation();
  const [ addTripToWishList,  bookmarkResult ] = useAddTripToWishListMutation();
  const { token } = useAuthContext();

  if (isLoading) {
    return (
      // prettier-ignore
      <CircularProgress />
    );
  }


  const handleTripSelect = async (event) => {
    let tripId = event.currentTarget.value;
    dispatch(getTripId(tripId));
    navigate(`/trips/details/${tripId}`);
  };
  const handleBookMark = async (e) => {
    e.preventDefault();
    const trip_id = e.currentTarget.value;
    const wishlist_id = 0
    addTripToWishList({ wishlist_id, trip_id})

  };

  const handleUpdateLikes = async (e) => {
    e.preventDefault()
    const tripId = e.currentTarget.value;
    let newLikes = 0;
    const cleanedData = barData.filter((trip) => trip.id == tripId)[0];
    if (cleanedData.likes === null) {
      newLikes = 1;
    }
    newLikes = cleanedData.likes + 1;
    const likeData = {
      trip_name: cleanedData.trip_name,
      locations: [],
      description: cleanedData.description,
      created_on: cleanedData.created_on,
      image_url: cleanedData.image_url,
      likes: newLikes,
      distance: 0,
      account: cleanedData.account,
      username: cleanedData.username,
      id: cleanedData.id,
    };
    updateTrip(likeData)
    
  }

  if (bookmarkResult.isSuccess) {
    /* eslint-disable */

    const bookmark = document.getElementById('bookmark')
    bookmark.classList.remove("d-none")
    setTimeout(() => {
      bookmark.classList.add("d-none");
    }, "2000")
    
  } else if (bookmarkResult.isError) {
    if (!token){
      const notLoggedIn = document.getElementById('needLogin')
      notLoggedIn.classList.remove("d-none")
      setTimeout(() => {
        notLoggedIn.classList.add("d-none");
      }, "2000")

    
    } else {
      const failBookmark = document.getElementById('failbookmark')
      failBookmark.classList.remove("d-none")
      setTimeout(() => {
        failBookmark.classList.add("d-none");
      }, "2000")
      console.log("error");
    }
  }

  if (result.isSuccess){
    console.log("yah")
  } else if (result.isError){ 
    console.log("nah")
  }

  

  //  ensure likes are set to 0 instead of null else return the trip obj
  const tripsData = barData.map((trip) =>
    trip.likes === null ? { ...trip, likes: 0 } : trip
  );


  // sort by most popular (likes)

  tripsData.sort((a, b) => b.likes - a.likes);

  return (
  <Container>
     <h1 align="center"> Top Trips </h1>
      <Alert key="success" variant="success" id="bookmark" className="d-none">
          Added To Favorites!
      </Alert>
      <Alert key="danger" variant="danger" id="failbookmark" className="d-none">
          Already added to bookmarks!
      </Alert>
      <Alert key="needLogin" variant="danger" id="needLogin" className="d-none">
          Please login to add to bookmarks!
      </Alert>
      <Grid container spacing={7} columns={{ xs: 0, sm: 4, md: 8 }} >
            {tripsData?.map((trip) => 
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <Paper style={{width: '18rem'}}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="bottom" style={{maxHeight: '15rem', minHeight: '15rem'}}src={trip.locations[0].image_url} />
                    <Card.Body>
                      <Card.Title style={{fontSize: 30, fontSmooth: 3,}}>{trip.trip_name}</Card.Title>
                      <Card.Text style={{fontSize: 20, color: "#8c92ac"}}>
                        <Icon.PersonCircle className="me-2"/>

                        {trip.username}
                      </Card.Text>
                      <Card.Text>
                        <Icon.Quote className="ms-1 me-3"/>
                        {trip.description.slice(0, 50)}
                        <Icon.Quote className="ms-3 me-1"  />
                      </Card.Text>
                      <Button className="ms-1 me-1" variant="outline-primary"onClick={handleTripSelect} value={trip.id}>Details</Button>
                      
                      <Button variant="outline-primary" style={{marginLeft: 0, width: 50}} value={trip.id} onClick={(e) => handleBookMark(e)}> <Icon.BookmarkHeartFill/> </Button>
                      <Button className="me-4" variant="outline-primary" style={{marginLeft: 35, width: 60}} value={trip.id} onClick={(e) => handleUpdateLikes(e)}> <Icon.Heart/> {trip.likes}</Button>
                    </Card.Body>
                  </Card>
                </Paper>
              </Grid>

            )}
      </Grid>
 </Container>
  )
}
