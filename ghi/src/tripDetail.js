import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, ImageList } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from 'react-bootstrap/Card';
import * as Icon from 'react-bootstrap-icons';
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
                <Icon.Heart/> {tripData.likes}
              </Typography>
              {token && (
                <Typography align="center">
                  <Button onClick={handleTripEdit}>Edit</Button>
                </Typography>
              )}
            </Container>
          </Box>
        <Grid container spacing={7} columns={{ xs: 0, sm: 4, md: 8 }} >
            {locations?.map((bar) => 
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <Paper style={{width: '18rem'}}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="bottom" style={{maxHeight: '15rem', minHeight: '15rem'}}src={bar.image_url} />
                    <Card.Body>
                      <Card.Title style={{fontSize: 30, fontSmooth: 3,}}>{bar.bar_name}</Card.Title>
                       <Card.Text style={{fontSize: 20, color: "#8c92ac"}}>
                          Priority: {bar.position + 1 }
                        </Card.Text>
                      <a
                                href={bar.url}
                                underline="hover"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                        <Card.Text style={{fontSize: 20, color: "#8c92ac"}}>
                          Find out more on yelp
                        </Card.Text>
                        
                      </a>
                     
                      
          
                    </Card.Body>
                  </Card>
                </Paper>
              </Grid>

            )}
      </Grid>

        </main>
      </ThemeProvider>

    </>
  );
}
