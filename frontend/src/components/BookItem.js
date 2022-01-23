import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import MaterialLink from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectBook } from "states/booksSlice";
import DefaultImage from "assets/book.jpg";

const Img = styled("img")({
  height: 100,
});

const BookItem = ({ book, page = 1, index = 0 }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const openDetails = () => {
    dispatch(selectBook(book));
    navigate(`/books/details/${book.library.id}/${book.title}`);
  };

  const openReading = () => {
    dispatch(selectBook(book));
    navigate(`/books/read/${book.library.id}/${book.title}`);
  };

  return (
    <Paper data-testid={`book-item-${index}`} elevation={4} sx={{ px: 2 }}>
      <Grid container alignItems="center" mt={1.5} mb={0.5} columnSpacing={2}>
        <Grid item lg={1} md={1.5} sm={2}>
          {!book ? (
            <Skeleton variant="rectangular" height={100} width={69} />
          ) : (
            <Img
              src={book.cover || DefaultImage}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = DefaultImage;
              }}
              loading="lazy"
              style={{ borderRadius: "3px", width: "69px", height: "100px" }}
            />
          )}
        </Grid>

        <Grid item md={6} sm={10}>
          {!book ? (
            <>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                style={{
                  wordWrap: "break-word",
                  margin: "1vh",
                }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="subtitle2"
                style={{
                  wordWrap: "break-word",
                  margin: "1vh",
                  padding: "0.4vh",
                }}
              >
                {book.author}{" "}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item md={3} sm={8}>
          {!book ? (
            <Skeleton variant="text" width="80%" />
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
                onClick={() => openReading()}
              >
                Leggi
              </Button>
              <Button
                style={{ color: "#222C4A" }}
                data-testid={`details-button-${index}`}
                onClick={() => openDetails()}
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
