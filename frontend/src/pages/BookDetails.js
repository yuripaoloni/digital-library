import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { Link } from "react-router-dom";

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

import { formatBookKeys, getBookIcons } from "utils/bookUtils";

const Img = styled("img")({
  height: 400,
  borderRadius: 5,
  boxShadow: 2,
});

const BookDetails = () => {
  const { page, index } = useParams();

  const loading = useSelector((state) => state.books.loading);

  //? this one permits the BookDetails page to be showed only when coming from /books. If we reload the page on books/0/1 after the render we will get a different book
  //? because of getRandomBook. So, to ensure that this issue couldn't happen we allows to go in the /books/:page/:index page only from /books
  const book = useSelector((state) =>
    state.books.books.length > 0 ? state.books.books[page][index] : false
  );

  if (!book) return <Navigate to="/books" />;

  return (
    <PageWrapper>
      <Grid container justifyContent="center">
        <Grid item md={10} sm={11} xs={11}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12} data-testid="book-details-item">
              <Typography variant="h4">
                {loading ? (
                  <Skeleton variant="text" width="60%" />
                ) : (
                  book?.title
                )}
              </Typography>
              <Typography variant="subtitle1" xs={12}>
                {loading ? (
                  <Skeleton variant="text" width="40%" />
                ) : (
                  book?.author
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
                  {loading || !book ? (
                    <Skeleton variant="rectangle" height={500} />
                  ) : (
                    <Paper elevation={2}>
                      <List dense>
                        {book &&
                          Object.keys(book).map((key, itemIndex) => {
                            return (
                              getBookIcons(key) && (
                                <ListItem key={itemIndex}>
                                  <ListItemIcon>
                                    {getBookIcons(key, book[key])}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      book[key] instanceof Object
                                        ? book[key].name
                                          ? book[key].name
                                          : "Nessun risultato"
                                        : book[key]
                                        ? book[key]
                                        : "Nessun risultato"
                                    }
                                    secondary={formatBookKeys(key)}
                                  />
                                </ListItem>
                              )
                            );
                          })}
                      </List>
                    </Paper>
                  )}
                </Grid>
                <Grid item md={3} sm={4} xs={12}>
                  {loading ? (
                    <Skeleton variant="rectangle" height={400} width={280} />
                  ) : (
                    <Img src={book.image} loading="lazy" />
                  )}
                </Grid>
              </Grid>
              <Grid item md={6} mt={3}>
                <Grid container justifyContent="space-around">
                  <Grid item>
                    {!loading && (
                      <Button
                        LinkComponent={Link}
                        to={`/read/${page}/${index}`}
                      >
                        Vai alla lettura
                      </Button>
                    )}
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
