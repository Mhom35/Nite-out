import * as React from "react";
import { useState, useEffect } from "react";
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
// import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, ImageList } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import { getTripId } from "./app/tripId";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getTripId } from './app/tripId';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function TripDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({});
  // const [tripsData, setTripsData] = useState([]);
  const [locations, setLocations] = useState([]);
  let tripId = useSelector((state) => state.getTripId.value);
  console.log("trip id from selector:", tripId);

  // const { tripId } = useParams();

  // console.log("tripID", tripId)

  // useEffect(() => {
  //     const fetchTripsData = async () => {
  //         //get all the yelp bars added to database
  //         const url = "http://localhost:8001/trips";
  //         const response = await fetch(url);
  //         const data = await response.json();
  //         setTripsData(data);
  //         console.log("tripDetails page data", data)
  //     };
  //     fetchTripsData();
  // }, []);

  // console.log("tripsData", tripsData)

  useEffect(() => {
    const fetchTripData = async () => {
      // setTripData(tripsData[0])
      // console.log("TRIP DATA", tripData)
      const url = `http://localhost:8001/trips/${tripId}/getbars`;
      const response = await fetch(url);
      const data = await response.json();
      setTripData(data);
      // console.log("Data", data)
      setLocations(data["locations"]);
    };
    fetchTripData();
  }, [tripId]);

  const handleTripEdit = async (event) => {
    dispatch(getTripId(tripId));
    navigate(`/edit/trip/${tripId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {tripData.trip_name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {tripData.description}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {tripData.likes}
            </Typography>
            <Typography align="center">
              <Button onClick={handleTripEdit}>Edit</Button>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* <Grid container spacing={6}> */}
          <ImageList variant="masonry" cols={3} gap={30}>
            {locations.map((location) => (
              <ImageListItem item key={location.bar_id} xs={2} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={location.image_url}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {location.bar_name}
                    </Typography>
                    <a
                      href={location.url}
                      underline="hover"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More Information
                    </a>
                  </CardContent>
                </Card>
              </ImageListItem>
            ))}
          </ImageList>
          {/* </Grid> */}
        </Container>
      </main>
    </ThemeProvider>
  );
}
