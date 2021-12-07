import React, { useState, useEffect } from "react";
import { Grid, Pagination, Skeleton, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams, Link } from "react-router-dom";
import PageWrapper from "components/PageWrapper";
import { fetchBookPage } from "states/booksSlice";
import BookmarkModal from "components/BookmarkModal";

const Img = styled("img")({
  height: 700,
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

      <Grid item xs={12} data-testid="book-details-item">
        <Typography variant="h4">
          {loading ? <Skeleton variant="text" width="60%" /> : book?.title}
        </Typography>
        <Typography variant="subtitle1" xs={12}>
          {loading ? <Skeleton variant="text" width="40%" /> : book?.author}
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        {loading ? (
          <Skeleton variant="rectangle" height={800} width={280} />
        ) : (
          <Img src={pageUrl} loading="lazy" />
        )}
        <Pagination
          page={readingPage}
          count={book.pages}
          onChange={(e, page) => setReadingPage(page)}
        />
      </Grid>
      <Button onClick={() => setShowModal(true)}>Aggiungi segnalibro</Button>
      <Button
        LinkComponent={Link}
        to={`/notes/${page}/${index}/${readingPage}`}
      >
        Aggiungi/modifica note
      </Button>
    </PageWrapper>
  );
};

export default ReadBook;
