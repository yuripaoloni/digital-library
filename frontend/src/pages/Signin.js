import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { onSignIn } from "states/authSlice";
import { Navigate } from "react-router";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { error, loading, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changeEmail = (email) => {
    setEmail(email);
    email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
      ? setEmailError(false)
      : setEmailError(true);
  };

  const changePassword = (password) => {
    setPassword(password);
    password.length < 6 ? setPasswordError(true) : setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(onSignIn({ email, password }));
  };

  if (isAuth && !loading) return <Navigate to="/" />;

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container component="main" maxWidth="xs" data-testid="signin_root">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            error={emailError}
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => changeEmail(e.target.value)}
            inputProps={{ "data-testid": "signin_email_field" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            error={passwordError}
            helperText="Lunghezza minima 6 caratteri"
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            style={{ color: "#222C4A" }}
            onChange={(e) => changePassword(e.target.value)}
            inputProps={{ "data-testid": "signin_password_field" }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ background: "#222C4A" }}
            data-testid="signin_submit_button"
          >
            Sign In
          </Button>
          {error ? (
            <Typography data-testid="signin_error">
              Please Enter Valid Info
            </Typography>
          ) : (
            ""
          )}
          <Grid container>
            <Grid item xs>
              <Typography
                component={Link}
                to="#"
                variant="body2"
                style={{ color: "#222C4A" }}
              >
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                component={Link}
                data-testid="signup_link"
                to="/signup"
                variant="body2"
                style={{ color: "#222C4A" }}
              >
                Don't have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
