import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GroupIcon from "@mui/icons-material/Group";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookItem from "components/BookItem";
import Spinner from "components/Spinner";
import { onSearchUser } from "states/authSlice";
import IconButton from "@mui/material/IconButton";
import PageWrapper from "components/PageWrapper";
import { Link } from "react-router-dom";

/**
 * TODO
 * - profile image (?)
 * - personal info (username, name, surname, email)
 * - list of available groups (to do defined better)
 * - list of saved books
 */

const PersonalPage = () => {
  /**
   * should have: user.name, user.surname, user.email. user.groups, user.
   */

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.userLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    Object.keys(user).length === 0 &&
      dispatch(onSearchUser({ param: localStorage.getItem("username") }));
  }, [user, dispatch]);

  //TODO spinner o skeleton
  if (loading) return <Spinner />;

  return (
    <PageWrapper reducer="auth">
      <Container container component="main" sx={{ maxWidth: "80vw" }}>
        <CssBaseline />

        <Box
          sx={{
            backgroundColor: "#F5F5F7",
            borderRadius: "2vh",
            boxShadow: 7,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            container
            direction="column"
            spacing={3}
            direction={{ xs: "column", md: "row" }}
          >
            {/* <Grid
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              alt="Cindy Baker"
              // src={}
              style={{
                margin: "3vh",
                width: "100px",
                height: "100px",
              }}
            />

            <Grid
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle1" component="h2">
                {user.name}
              </Typography>
              <Typography variant="subtitle1" component="h2">
                {user.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle1" component="h2">
                display groups
              </Typography>
            </Grid>
          </Grid> */}
            <Grid
              item
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                alt="Cindy Baker"
                src={`data:image/jpeg;base64,${user.picture}`}
                style={{
                  margin: "3vh",
                  width: "100px",
                  height: "100px",
                }}
              />
              <Typography variant="h5" component="h2">
                {user.username}
              </Typography>
              <Typography variant="body2" component="h2">
                {user.email}
              </Typography>
              <Typography variant="body2" component="h2">
                {user.name} & {user.surname}
              </Typography>
              <IconButton
                aria-label="delete"
                size="large"
                LinkComponent={Link}
                to="/groups"
              >
                <GroupIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              books list
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default PersonalPage;
