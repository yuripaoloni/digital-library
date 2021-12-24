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

//? user.savedBooks contains the list of saved books

const PersonalPage = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.userLoading);

  //TODO spinner o skeleton
  if (loading) return <Spinner />;

  const renderBook = (book) => {
    return (
      <Grid
        margin="20px 0 20px 0"
        width="900px"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{}}
        key={book.id}
      >
        <BookItem book={book} />
      </Grid>
    );
  };

  return (
    <PageWrapper reducer="auth">
      <Container component="main" sx={{ maxWidth: "80vw" }}>
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
          <Grid container direction="column" spacing={3}>
            <Grid
              item
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                alt={user.username}
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
                data-testid="groups-link-icon"
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
              margin="20px 0 20px 0"
            >
              {loading ? <Spinner /> : user?.savedBooks?.map(renderBook)}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default PersonalPage;
