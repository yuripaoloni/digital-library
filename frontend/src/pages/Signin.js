import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signinActions } from "states/signinSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const { valid, err } = useSelector((state) => state.signin);
  const { setEmail, setPassword, setErr } = signinActions;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!valid) dispatch(setErr(true));
    else dispatch(setErr(false));
  };

  const handleChange = (type) => {
    return (e) => {
      if (type === "email") dispatch(setEmail(e.target.value));
      else if (type === "password") dispatch(setPassword(e.target.value));
    };
  };

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
            fullWidth
            defaultValue=""
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange("email")}
            inputProps={{ "data-testid": "signin_email_field" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            defaultValue=""
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            style={{ color: "#222C4A" }}
            onChange={handleChange("password")}
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
          {err ? (
            <Typography data-testid="signin_error">
              Please Enter Valid Info
            </Typography>
          ) : (
            ""
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" style={{ color: "#222C4A" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" style={{ color: "#222C4A" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
