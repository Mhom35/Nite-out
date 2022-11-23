import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Trip() {
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
            <TextField margin="normal" fullWidth id="" label="Trip Name" name="" />
            <TextField margin="normal" fullWidth id="" label="Location" name=""/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Submit </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
