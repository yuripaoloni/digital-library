import { useSelector } from "react-redux";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ButtonGroup } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookItem from "components/BookItem";

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

  return (
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
        <Avatar
          alt="Cindy Baker"
          // src={}
          style={{
            margin: "3vh",
            width: "100px",
            height: "100px",
          }}
        />

        <Grid container direction="column" spacing={3}>
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={6}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle1" component="h2">
                Nome & Congome email username
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
  );
};

export default PersonalPage;
