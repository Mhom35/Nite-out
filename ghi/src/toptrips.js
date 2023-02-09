import * as React from "react";
// import Button from "@mui/material/Button";/
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import RecommendIcon from "@mui/icons-material/Recommend";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { getTripId } from "./app/tripId";
import { useDispatch } from "react-redux";
import { useGetAllTripsQuery } from "./app/tripsApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useUpdateTripMutation } from "./app/tripsApi";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";


const theme = createTheme();

export default function TopTrips() {
  const { data: barData, isLoading } = useGetAllTripsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateTrip, result] = useUpdateTripMutation();
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
  const handleLiked = async (event) => {
    event.preventDefault();
    const tripID = event.currentTarget.value;
    let newLikes = 0;
    /* eslint-disable */
    const cleanedData = barData.filter((trip) => trip.id == tripID)[0];
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
      id: cleanedData.id,
    };
    updateTrip(likeData);
  };
  if (result.isSuccess) {
    navigate(0);
  } else if (result.isError) {
    console.log("error");
  }
  //  ensure likes are set to 0 instead of null else return the trip obj
  const tripsData = barData.map((trip) =>
    trip.likes === null ? { ...trip, likes: 0 } : trip
  );


  // sort by most popular (likes)

  // function insertionSort(arr) {
  //   for (let i = 1; i < arr.length; i++) {
  //     let currentValue = arr[i]
  //     let j
  //     for (j = i - 1; j >= 0 && arr[j].likes < currentValue.likes; j--) {
  //       arr[j + 1] = arr[j]
  //     }
  //     arr[j + 1] = currentValue
  //   }
  //   return arr
  // }

  // insertionSort(tripsData)
  tripsData.sort((a, b) => b.likes - a.likes);

  return (
  <Container>
     <h1 align="center"> Top Trips </h1>
      <Grid container spacing={7} columns={{ xs: 0, sm: 4, md: 8 }} >
            {tripsData?.map((trip) => 
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <Paper>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="bottom" style={{maxHeight: '15rem', minHeight: '15rem'}}src={trip.locations[0].image_url} />
                    <Card.Body>
                      <Card.Title>{trip.trip_name}</Card.Title>
                      <Card.Text>
                        {trip.description}
                      </Card.Text>
                      <Button variant="primary" onClick={handleTripSelect} value={trip.id}>Details</Button>
                      <Button value={trip.id} onClick={handleLiked}> {trip.likes}</Button>
                    </Card.Body>
                  </Card>
                </Paper>
              </Grid>

            )}
      </Grid>
 </Container>
  )

  //   <ThemeProvider theme={theme}>
  //     <h1 align="center"> Top Trips </h1>
  //     <TableContainer component={Paper}>
  //       <Table sx={{ minWidth: 400 }} aria-label="simple table">
  //         <TableHead>
  //           {/* <TableRow>
  //             <TableCell align="center" width="100">
  //               Trip Name
  //             </TableCell>
  //             <TableCell align="center" width="125">
  //               Description
  //             </TableCell>
  //             <TableCell align="center">Image</TableCell>
  //             <TableCell align="center">Likes</TableCell>
  //           </TableRow> */}
  //         </TableHead>
  //         <TableBody>
  //           {/* {tripsData?.map((trip) => (
  //             <TableRow
  //               key={trip.name}
  //               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //             >
  //               <TableCell align="center" component="th" scope="row">
  //                 <Button onClick={handleTripSelect} value={trip.id}>
  //                   {trip.trip_name}
  //                 </Button>
  //               </TableCell> */}
  //               {/* <TableCell align="center">
  //                 {trip.locations[0].bar_name}
  //               </TableCell> */}
  //               {/* <TableCell align="center">{trip.description}</TableCell>
  //               <TableCell align="center">
  //                 <img src={trip.locations[0].image_url} width="200" alt="" />
  //               </TableCell>
  //               <TableCell align="center">
  //                 <Button value={trip.id} onClick={handleLiked}>
  //                   <RecommendIcon />
  //                   {trip.likes}
  //                 </Button>
  //               </TableCell>
  //             </TableRow>
  //           ))} */}
            // {tripsData?.map((trip) => 
            //       <Card style={{ width: '18rem' }}>
            //         <Card.Img variant="top" src={trip.locations[0].image_url} />
            //         <Card.Body>
            //           <Card.Title>{trip.trip_name}</Card.Title>
            //           <Card.Text>
            //             {trip.description}
            //           </Card.Text>
            //           <Button variant="primary">Go somewhere</Button>
            //         </Card.Body>
            //       </Card>

            // )}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </ThemeProvider>
  // );
}
