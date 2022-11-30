import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useRef } from 'react';
import YelpMap from './yelpmap';

const theme = createTheme();

export default function Trip(props) {
  //     constructor(props) {
  //         super(props)
  //         this.state = {

  //         };
  //         this.handleChange = this.handleChange.bind(this);
  //         this.handleChange = this.handleChange.bind(this);
  //         this.handleChange = this.handleChange.bind(this);

  //     }

  //     goneTrips(data) {
  //       const goneTrips = []
  //       const ***** = this.state.*****.map(item => {return item.*****})
  //       for (let ***** of *****) {
  //           if (!*****.includes(*****)) {
  //               goneTrips.push(*****)
  //           }
  //       }
  //       this.setState({*****: *****})
  //   }

  //     async handleSubmit(event) {
  //         event.preventDefault();
  //         const data = {...this.state};
  //         data.***** = data.*****
  //         delete data.*****
  //         delete data.*****
  //         delete data.*****
  //         delete data.*****
  //         delete data.*****
  //         delete data.*****
  //         delete data.*****
  //         delete data.*****



  //         const *****Url = '*****';
  //         const fetchConfig = {
  //             method: "post",
  //             body: JSON.stringify(data),
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //         };

  //         const ***** = await fetch(*****, fetchConfig);


  //         if (*****.ok) {
  //           const cleared = {
  //               *****: "",
  //               *****: "",
  //               *****: "",
  //               *****: "",
  //           };
  //             this.setState(cleared);
  //             this.componentDidMount()
  //         }
  //     }

  //     handle*****Change(event) {
  //         const value = event.target.value;
  //         this.setState({*****: value});
  //     }

  //     handle*****Change(event) {
  //         const value = event.target.value;
  //         this.setState({*****: value})
  //     }

  //     handle*****Change(event) {
  //         const value = event.target.value;
  //         this.setState({*****: value})
  //     }

  //     handle*****Change(event) {
  //         const value = event.target.value;
  //         this.setState({*****: value})
  //     }

  //     async componentDidMount() {


  //         const *****Url = '*****';
  //         const *****Response = await fetch(*****Url);
  //         if (*****Response.ok) {
  //             const data = await *****Response.json();
  //             this.setState({*****people: data.*****});

  //         }
  //         const *****Url = '*****';
  //         const *****Response = await fetch(customerUrl);
  //         if (*****Response.ok) {
  //             const data = await *****Response.json();
  //             this.setState({*****: data.*****});
  //         }

  //         const *****Url = '*****';
  //         const *****Response = await fetch(*****Url);
  //         if (*****Response.ok) {
  //             const data = await *****Response.json();

  //             this.setState({*****: data.*****});

  //         }
  //         const *****Url = "*****";
  //         const *****Response = await fetch(*****Url);
  //         if (*****Response.ok) {
  //             const *****Data = await *****Response.json();

  //             // this.setState({*****: *****Data.*****});
  //             this.goneTrips(*****);
  //         }



  //     }

  const locationsMapRef = useRef();

  // const scrollToSection = (elementRef) => {
  //   window.scrollTo({
  //     top: elementRef.current.offsetTop,
  //     behavior: 'smooth'
  //   })
  // }

  const [tripName, setTripName] = useState('');
  // const [location, setLocation] = useState([]);
  const [description, setDescription] = useState('');
  const [clicked, setClicked] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Typography component="h1" variant="h5"> Create a Trip </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField onChange={(event) => setTripName(event.target.value)} value={tripName} margin="normal" fullWidth id="" label="Trip Name" name="" />
            <Link to="#yelpMap">
              <Button type="button" fullWidth variant="outlined" onClick={(event) => setClicked(true)} sx={{ mt: 3, mb: 2 }}> Add Locations </Button>
            </Link>
            <TextField margin="normal" fullWidth id="outlined-multiline-static" multiline label="Description" name="" rows={3} value={description} onChange={(event) => setDescription(event.target.value)} />
          </Box>

          {clicked && (
            <>
              <div ref={locationsMapRef}>
                <YelpMap />
              </div>
              <div>
                <Button type="button" fullWidth variant="outlined" onClick={(event) => setClicked(false)} sx={{ mt: 3, mb: 2 }}>Finished Adding Locations</Button>
              </div>
            </>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Submit </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
