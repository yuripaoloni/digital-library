import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import PageWrapper from "components/PageWrapper";
import NoMatch from "pages/NoMatch";

import Logo from "assets/sample2.jpg";
import { formatBookKeys, getBookIcons } from "utils/bookUtils";
import { Link } from "react-router-dom";

const Img = styled("img")({
  height: 400,
  borderRadius: 2,
  boxShadow: 2,
});

const BookDetails = () => {
  let { page, index } = useParams();

  const { loading, books } = useSelector((state) => state.books);

  //? check that the route params are valid for the books matrix
  if (!loading && (books.length < page || books[page].length < index))
    return <NoMatch />;

  return (
    <PageWrapper>
      <Grid container mt={3} justifyContent="center">
        <Grid item md={10} sm={11} xs={11}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">
                {!loading ? (
                  books[page][index].title
                ) : (
                  <Skeleton variant="text" width="60%" />
                )}
              </Typography>
              <Typography variant="subtitle1" xs={12}>
                {!loading ? (
                  books[page][index].author
                ) : (
                  <Skeleton variant="text" width="40%" />
                )}
              </Typography>
            </Grid>
            <Grid item md={10} sm={11} xs={12}>
              <Grid
                container
                justifyContent={{ sm: "space-between" }}
                alignItems="center"
                rowSpacing={{ xs: 3 }}
              >
                <Grid item lg={7} md={8} sm={7} xs={12}>
                  {loading ? (
                    <Skeleton variant="rectangle" height={500} />
                  ) : (
                    <Paper elevation={2}>
                      <List dense>
                        {Object.keys(books[page][index]).map(
                          (key, itemIndex) => {
                            return (
                              getBookIcons(key) && (
                                <ListItem key={itemIndex}>
                                  <ListItemIcon>
                                    {getBookIcons(key)}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      books[page][index][key] instanceof Object
                                        ? books[page][index][key].name
                                        : books[page][index][key]
                                    }
                                    secondary={formatBookKeys(key)}
                                  />
                                </ListItem>
                              )
                            );
                          }
                        )}
                      </List>
                    </Paper>
                  )}
                </Grid>
                <Grid item md={3} sm={4} xs={12}>
                  {loading ? (
                    <Skeleton variant="rectangle" height={400} width={280} />
                  ) : (
                    <Img src={Logo} />
                  )}
                </Grid>
              </Grid>
              <Grid item md={6} mt={3}>
                <Grid container justifyContent="space-around">
                  <Grid item>
                    {!loading && <Button>Vai alla lettura</Button>}
                  </Grid>
                  <Grid item>
                    {!loading && (
                      <Button LinkComponent={Link} to="/books">
                        Torna al catalogo
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default BookDetails;
