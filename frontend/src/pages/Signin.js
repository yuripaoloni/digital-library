import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { onPasswordRecovery, onSignIn } from "states/authSlice";
import { Navigate } from "react-router";
import Spinner from "../components/Spinner";
import { Link, useLocation } from "react-router-dom";
import PageWrapper from "components/PageWrapper";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const { loading, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

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
    forgotPassword
      ? dispatch(
          onPasswordRecovery({
            email,
            redirect: `${window.location.hostname}/resetPassword`,
          })
        )
      : dispatch(onSignIn({ email, password }));
  };

  if (isAuth && !loading) return <Navigate to={from} />;

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageWrapper reducer="auth">
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
            {forgotPassword ? "Cambio password" : "Sign in"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            {!forgotPassword && (
              <TextField
                margin="normal"
                required
                fullWidth
                error={passwordError}
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
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: "#222C4A" }}
              data-testid="signin_submit_button"
            >
              {forgotPassword ? "Invia mail per cambio password" : "Sign in"}
            </Button>
            {!forgotPassword && (
              <Grid container>
                <Grid item xs>
                  <Typography
                    component={Link}
                    to="#"
                    variant="body2"
                    style={{ color: "#222C4A" }}
                    onClick={() => setForgotPassword(true)}
                    data-testid="change_password_button"
                  >
                    Password dimenticata?
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
                    Non hai un account? Registrati
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
}
