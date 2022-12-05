import * as React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
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

const theme = createTheme();

export default function TopTrips() {
    const { data: barData, isLoading } = useGetAllTripsQuery();
    const [first, setFirst] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            // prettier-ignore
            <CircularProgress />
        );
    }

    const handleTripSelect = async (event) => {
        let tripId = event.currentTarget.value
        dispatch(getTripId(tripId))
        navigate(`/trips/details/${tripId}`)
    }

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
