import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetWishListQuery
} from "./app/favoritesAPI";
import { useDispatch } from "react-redux";
import { useAuthContext, getToken } from "./frontendAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useGetOneTripQuery } from "./app/tripsApi";


function MyVerticallyCenteredModal(props) {
    const { data: barData} = useGetOneTripQuery(props.trip);
  return (
    barData && <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Bars 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="container">
                <div className="offset"></div>
                    <div className="main-wrapper">
                        {barData.locations?.map((location) => 
                            <div className="item">
                            <img key={location.bar_id} src={location.image_url} alt="" />
                            <Typography gutterBottom variant="t5" component="h2">
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
                                
                        )}
                </div>
            </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}



export default function WishList() {

    const { data: wishlistdata, isLoading } = useGetWishListQuery();
    // const [modalShow, setModalShow] = usestate('');
    const [modalShow, setModalShow] = useState(false);
    const [indivTrip, setIndivTrip ] = useState(0);
    const cityLandscape = require("./assets/city-landscape.webp");

    if (isLoading) {
    return (
      // prettier-ignore
      <CircularProgress />
    );
  }
  const styles = {
    paperContainer: {
        backgroundImage: `url(${cityLandscape})`
    }
};

    const handleShowModal = async (e) => {
        const locations = e.target.value
        setModalShow(true)
        setIndivTrip(locations)

    }


    return (
        <>
        <Container style={styles.paperContainer} maxWidth={false}>
            <h1 align="center" className="fav"> Favorited Trips </h1>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} columns={{ xs: 0, sm: 0, md: 6 }} >
                {wishlistdata?.map((trip) => 
                <Grid item xs={12} sm={4} md={2} lg={1}>
                    <Paper style={{width: '20rem'}}>
                    <Card style={{ width: '20rem' }}>
                        <Card.Img variant="bottom" style={{maxHeight: '20rem', minHeight: '15rem'}}src={trip.locations[0].image_url} />
                        <Card.Body>
                        <Card.Title key={trip.id} style={{fontSize: 30, fontSmooth: 3,}}>{trip.trip_name}</Card.Title>
                        <Card.Text style={{fontSize: 20, color: "#8c92ac"}}>
                            <Icon.PersonCircle className="me-2"/>

                            {trip.username}
                        </Card.Text>
                        <Card.Text style={{fontSize: 17, color: "#8c92ac"}}>
                        <Icon.GeoAlt className="me-2"/>

                        {trip.city}
                      </Card.Text>
                        <Card.Text>
                            <Icon.Quote className="ms-1 me-3"/>
                            {trip.description.slice(0, 50)}
                            <Icon.Quote className="ms-3 me-1"  />
                        </Card.Text>
                        <Button className="ms-1 me-1" variant="outline-primary" onClick={handleShowModal} value={trip.id}>See Locations</Button>
                             <MyVerticallyCenteredModal
                                show={modalShow}
                                trip={indivTrip}
                                onHide={() => setModalShow(false)}
                                />    

                            
                        </Card.Body>
                    </Card>
                    </Paper>
                </Grid>

                )}
        </Grid>  
        </Container>
            
        </>
        )

    }