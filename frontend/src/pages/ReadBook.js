import React, { useState, useEffect } from "react";
import { Grid, Pagination, Skeleton, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams, Link } from "react-router-dom";
import PageWrapper from "components/PageWrapper";
import { fetchBookPage } from "states/booksSlice";
import BookmarkModal from "components/BookmarkModal";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeIcon from "@mui/icons-material/Mode";

const Img = styled("img")({
  height: 1000,
  borderRadius: 5,
  boxShadow: 2,
});

const ReadBook = () => {
  const [readingPage, setReadingPage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { page, index } = useParams();

  const loading = useSelector((state) => state.books.loading);
  const pageUrl = useSelector((state) => state.books.pageUrl);

  //? this one permits the ReadBook page to be showed only when coming from /books or /. If we reload the page on books/0/1 after the render we will get a different book
  //? because of getRandomBook. So, to ensure that this issue couldn't happen we allows to go in the /books/:page/:index page only from /books
  const book = useSelector((state) =>
    state.books.books.length > 0 ? state.books.books[page][index] : false
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookPage({ book, page: readingPage }));
  }, [book, readingPage, dispatch]);

  if (!book) return <Navigate to="/books" />;

  /**
   * TODO
   * - fix layout foto pagina, button, pagination e titolo
   */

  return (
    <PageWrapper>
      <BookmarkModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />

      <Grid container justifyContent="center" xs={12}>
        <Grid
          item
          xs={12}
          data-testid="book-details-item"
          container
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          padding="2vh"
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "80%", margin: "0 0 10px 10px" }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: ["15px", "25px", "25px", "25px"],
              }}
            >
              {loading ? <Skeleton variant="text" width="50%" /> : book?.title}
            </Typography>
          </Grid>

          <Typography variant="subtitle1" xs={12}>
            {loading ? <Skeleton variant="text" width="40%" /> : book?.author}
          </Typography>
        </Grid>
        <Grid container justifyContent="center" xs={12}>
          {loading ? (
            <Skeleton variant="rectangle" height={800} width={280} />
          ) : (
            <Img
              sx={{
                ["@media (max-width : 600px)"]: {
                  width: 300,
                  height: 450,
                },
              }}
              src={pageUrl}
              loading="lazy"
            />
          )}
        </Grid>
        <Grid
          container
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          padding="4vh"
          md={12}
        >
          <Grid>
            <Pagination
              page={readingPage}
              count={book.pages}
              sx={{
                width: ["250px", "100%", "100%", "100%"],
              }}
              onChange={(e, page) => setReadingPage(page)}
            />
          </Grid>
          <Grid paddingTop="2vh">
            <IconButton
              onClick={() => setShowModal(true)}
              style={{ color: "#222C4A" }}
            >
              <BookmarkBorderIcon />
            </IconButton>
            <IconButton
              LinkComponent={Link}
              to={`/notes/${page}/${index}/${readingPage}`}
              style={{ color: "#222C4A" }}
            >
              <ModeIcon />
            </IconButton>
            {/* <Button onClick={() => setShowModal(true)}>
              Aggiungi segnalibro
            </Button>
            <Button
              LinkComponent={Link}
              to={`/notes/${page}/${index}/${readingPage}`}
            >
              Aggiungi/modifica note
            </Button> */}
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default ReadBook;
