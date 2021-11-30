import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { signupActions } from "states/signupSlice";
export default function SignUp() {
  const dispatch = useDispatch();
  const { valid, err } = useSelector((state) => state.signup);
  const { setFirstname, setLastname, setEmail, setPassword, setErr } =
    signupActions;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!valid) dispatch(setErr(true));
    else dispatch(setErr(false));
  };

  const handleChange = (type) => {
    return (e) => {
      if (type === "firstname") dispatch(setFirstname(e.target.value));
      else if (type === "lastname") dispatch(setLastname(e.target.value));
      else if (type === "email") dispatch(setEmail(e.target.value));
      else if (type === "password") dispatch(setPassword(e.target.value));
    };
  };

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
                onChange={handleChange("firstname")}
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
                onChange={handleChange("lastname")}
                inputProps={{ "data-testid": "signup_lastname_field" }}
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
                onChange={handleChange("email")}
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
                id="password"
                autoComplete="new-password"
                onChange={handleChange("password")}
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
          {err ? (
            <Typography data-testid="signup_error">
              Please Enter Valid Info
            </Typography>
          ) : (
            ""
          )}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" style={{ color: "#222C4A" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
