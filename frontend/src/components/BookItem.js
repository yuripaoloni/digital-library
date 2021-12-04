import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import MaterialLink from "@mui/material/Link";
import { Link } from "react-router-dom";

const Img = styled("img")({
  height: 100,
});

const BookItem = ({ book, page = 1, index = 0 }) => {
  return (
    <Paper data-testid={`book-item-${index}`} elevation={4} sx={{ px: 2 }}>
      <Grid container alignItems="center" mt={1.5} mb={0.5} columnSpacing={2}>
        <Grid item lg={1} md={1.5} sm={2}>
          {!book ? (
            <Skeleton variant="rectangular" height={100} />
          ) : (
            <Img
              src={book.image}
              loading="lazy"
              style={{ borderRadius: "3px" }}
            />
          )}
        </Grid>
        <Grid item md={6} sm={10}>
          {!book ? (
            <>
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </>
          ) : (
            <>
              <Typography variant="h6" style={{ wordWrap: "break-word" }}>
                {book.title}
              </Typography>
              <Typography variant="subtitle2">{book.author}</Typography>
            </>
          )}
        </Grid>
        <Grid item md={3} sm={8}>
          {!book ? (
            <Skeleton variant="text" />
          ) : (
            <MaterialLink variant="subtitle1" href={book.library.url}>
              {book.library.name}
            </MaterialLink>
          )}
        </Grid>
        <Grid item lg={2} md={1.5} sm={4}>
          {!book ? (
            <Skeleton variant="rectangle" />
          ) : (
            <Grid container justifyContent="center">
              <Button
                style={{ color: "#222C4A" }}
                data-testid={`read-button-${index}`}
              >
                Leggi
              </Button>
              <Button
                style={{ color: "#222C4A" }}
                data-testid={`details-button-${index}`}
                LinkComponent={Link}
                to={`/books/${page - 1}/${index}`}
              >
                Dettagli
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookItem;
