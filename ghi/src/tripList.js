import * as React from "react";
import Button from "@mui/material/Button";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
// import Container from '@mui/material/Container';
import RecommendIcon from "@mui/icons-material/Recommend";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { getTripId } from "./app/tripId";
import { useDispatch } from "react-redux";
import { useGetAllTripsQuery } from "./app/tripsApi";
import CircularProgress from "@mui/material/CircularProgress";
// import { TableSortLabel } from '@mui/material';
// import Checkbox from '@mui/material/Checkbox';
// import { visuallyHidden } from '@mui/utils';
// import PropTypes from 'prop-types';
// import Toolbar from '@mui/material/Toolbar';
// import { alpha } from '@mui/material/styles';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import TablePagination from '@mui/material/TablePagination';

const theme = createTheme();

export default function TripList() {
  const { data: barData, error, isLoading } = useGetAllTripsQuery();
  const [first, setFirst] = useState(0);
  const [tripsData, setTripsData] = useState([]);
  // const [tripData, setTripData] = useState(0)
  // const [tripId, setTripId] = useState(0)
  // let tripId = 0

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchTripsData = async () => {
  //       //get all the yelp bars added to database
  //       const url = "http://localhost:8001/trips";
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       // console.log("FETCHTRIPSDATA", data)
  //       setTripsData(data);
  //       // setTripData(data[0]) // how do i set trip data to a single
  //     };
  //     fetchTripsData();
  //   }, []);
  if (isLoading) {
    return (
      // prettier-ignore
      <CircularProgress />
    );
  }

  const handleTripSelect = async (event) => {
    // console.log("event.currentTarget.value:", event.currentTarget.value)
    // setTripId(event.currentTarget.value)
    let tripId = event.currentTarget.value;
    // setTripData(tripsData[tripId])

    // const fetchTripData = async () => {
    //     const url = `http://localhost:8001/trips/${tripId}/getbars`;
    //     const response = await fetch(url);
    //     // const data = await response.json();
    //     await response.json();
    //     // console.log("Data", data)
    // };
    // fetchTripData();
    dispatch(getTripId(tripId));
    // return redirect(`/trips/details/${tripId}`)
    navigate(`/trips/details/${tripId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <h1 align="center"> Top Trips </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width="100">
                Trip Name
              </TableCell>
              <TableCell align="center" width="125">
                Bar Name
              </TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {barData?.map((trip) => (
              <TableRow
                key={trip.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  <Button onClick={handleTripSelect} value={trip.id}>
                    {trip.trip_name}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {trip.locations[0].bar_name}
                </TableCell>
                <TableCell align="center">
                  <img src={trip.locations[0].image_url} width="200" alt="" />
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => setFirst(first + 1)}>
                    <RecommendIcon />
                    {`${first === 0 ? "" : first}`}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
