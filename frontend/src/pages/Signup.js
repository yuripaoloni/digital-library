import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { onSignUp } from "states/authSlice";
import { Navigate, useNavigate } from "react-router";

export default function SignUp() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  //TODO se vuoi gestire errori su name, surname, username fai come con changeEmail e changePassword

  const { error, loading } = useSelector((state) => state.auth);
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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(onSignUp({ name, surname, username, email, password }));
    //TODO vedere se funziona dopo inserimento Spinner
    !loading && navigate("/signin");
  };

  // TODO if(loading) return a spinner or something

  return (
    <Container component="main" maxWidth="xs" data-testid="signup_root">
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ "data-testid": "signup_firstname_field" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                inputProps={{ "data-testid": "signup_lastname_field" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="family-name"
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{ "data-testid": "signup_username_field" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                error={emailError}
                name="email"
                autoComplete="email"
                onChange={(e) => changeEmail(e.target.value)}
                inputProps={{ "data-testid": "signup_email_field" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                helperText="Lunghezza minima 6 caratteri"
                id="password"
                error={passwordError}
                autoComplete="new-password"
                onChange={(e) => changePassword(e.target.value)}
                inputProps={{ "data-testid": "signup_password_field" }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ background: "#222C4A" }}
            data-testid="signup_submit_button"
          >
            Sign Up
          </Button>
          {/* //TODO se vuoi c'è unsetError su authSlice per cancellare errore */}
          {error ? (
            <Typography data-testid="signup_error">
              Please Enter Valid Info
            </Typography>
          ) : (
            ""
          )}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2" style={{ color: "#222C4A" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
