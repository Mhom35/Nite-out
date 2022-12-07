import * as React from "react";
import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { json } from "react-router-dom";
import { useToken } from "./frontendAuth";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate();
  const [token, login] = useToken();

  const onSubmit = async (event) => {
    event.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (token) {
      // console.log("TOKEN DATA IN CREATE", tokenData)
      navigate("/")
    }
  }, [token, navigate])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={onSubmit}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
                value={username}
              // {...register("username", { required: "Required" })}
              // error={!!errors?.email}
              // helperText={errors?.email ? errors.email.message : null}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
                value={password}
              // {...register("password", { required: "Required Field" })}
              // error={!!errors?.password}
              // helperText={errors?.password ? errors.password.message : null}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login/new" variant="body2">
                    {"Don't have an account? Sign Up"}
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
