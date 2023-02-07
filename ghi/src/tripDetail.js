import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, ImageList } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import { getTripId } from "./app/tripId";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./frontendAuth";

const theme = createTheme();

export default function TripDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({});
  const [locations, setLocations] = useState([]);
  const { token } = useAuthContext();
  let tripId = useSelector((state) => state.getTripId.value);

  useEffect(() => {
    const fetchTripData = async () => {
      const url = `${process.env.REACT_APP_TRIPS_API_HOST}/trips/${tripId}/getbars`;
      const response = await fetch(url);
      const data = await response.json();
      setTripData(data);
      setLocations(data["locations"]);
    };
    fetchTripData();
  }, [tripId]);

  const handleTripEdit = async (event) => {
    dispatch(getTripId(tripId));
    navigate(`/edit/trip/${tripId}`);
  };
  // $(function () {
  //   function beerRise() {
  //     $(".beer").addClass("fill");
  //     $(".head").addClass("active");
  //   }
  //   function pourBeer() {
  //     $(".pour").addClass("pouring");
  //     beerRise();
  //     setTimeout(function () {
  //       $(".pour").addClass("end");
  //     }, 1500);
  //   }
  //   setTimeout(function () {
  //     pourBeer();
  //   }, 3000);
  // });

  return (
    <>
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
                font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
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
              {token && (
                <Typography align="center">
                  <Button onClick={handleTripEdit}>Edit</Button>
                </Typography>
              )}
            </Container>
          </Box>
            <div class="container">
              <div class="offset"></div>
              <div class="main-wrapper">
                  {locations.map((location) => (
                    <div class="item">
                      <img key={location.bar_id} src={location.image_url} alt="" />
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
            </div>
          ))}
          </div>
        </div>

        </main>
      </ThemeProvider>

    </>
  );
}
