import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useToken } from './frontendAuth';
import { useGetTokenQuery } from "./app/authApiSlice";
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from './app/authApiSlice';


const theme = createTheme();

export default function SignUp() {
  const [signUp, result] = useSignUpMutation();
  // const [token, login, logout, signup] = useToken();
  // const [token, login, , signup] = useToken();
  const navigate = useNavigate();

  const { data: tokenData } = useGetTokenQuery();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("TOKENDATA BEFORE SIGNUP", tokenData)
    console.log("TOKEN DATA before", tokenData)
    const response = await signUp({ username, email, password })
    // signUp({ username, email, password });
    if (response.data.access_token) {
      navigate('/trips/new')
    }
  };
  // useEffect(() => {
  //   console.log("TOKEN AFTER SIGNUP OUTSIDE HANDLE", tokenData)
  // }, [tokenData])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="Username"
                    autoComplete="Username"
                    onChange={(e) => { setUsername(e.currentTarget.value) }}
                    value={username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => { setEmail(e.currentTarget.value) }}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => { setPassword(e.currentTarget.value) }}
                    value={password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
