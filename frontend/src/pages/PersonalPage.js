import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GroupIcon from "@mui/icons-material/Group";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BookItem from "components/BookItem";
import Spinner from "components/Spinner";
import IconButton from "@mui/material/IconButton";
import PageWrapper from "components/PageWrapper";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import Stack from "@mui/material/Stack";

const PersonalPage = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.userLoading);

  if (loading) return <Spinner />;

  return (
    <PageWrapper reducer="auth">
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            borderRadius: "2vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container direction="column">
            <Grid
              item
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ paddingBottom: "2vh" }}
            >
              <Avatar
                alt={user.username}
                src={`data:image/jpeg;base64,${user.picture}`}
                style={{
                  margin: "2vh",
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
                {user.name} {user.surname}
              </Typography>
              <IconButton
                data-testid="groups-link-icon"
                size="large"
                LinkComponent={Link}
                to="/groups"
              >
                <GroupIcon />
              </IconButton>
            </Grid>
            <Divider />

            <Stack px={2} mt={2} spacing={2}>
              {user?.savedBooks?.length > 0 ? (
                user?.savedBooks?.map((book, index) => (
                  <BookItem key={index} book={book} index={index} />
                ))
              ) : (
                <Typography variant="subtitle2" textAlign="center">
                  Nessun libro salvato
                </Typography>
              )}
            </Stack>
          </Grid>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default PersonalPage;
