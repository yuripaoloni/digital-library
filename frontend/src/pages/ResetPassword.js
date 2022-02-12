import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "components/PageWrapper";
import { onResetPassword } from "states/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { loading, passwordReset } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changePassword = (password) => {
    setPassword(password);
    password.length < 6 ? setPasswordError(true) : setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      onResetPassword({ password, resetToken: searchParams.get("resetToken") })
    );
  };

  if (passwordReset && !loading) return <Navigate to="/signin" />;

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
            Cambio password
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
              fullWidth
              error={passwordError}
              name="password"
              label="Nuova password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              style={{ color: "#222C4A" }}
              onChange={(e) => changePassword(e.target.value)}
              inputProps={{ "data-testid": "new_password_field" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: "#222C4A" }}
              data-testid="signin_submit_button"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default ResetPassword;
