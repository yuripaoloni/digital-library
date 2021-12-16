import React, { useState, useEffect } from "react";
import { Grid, Pagination, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import PageWrapper from "components/PageWrapper";
import {
  fetchBookData,
  fetchBookPage,
  fetchSingleBook,
  onCreateBookmark,
  onDeleteBookmark,
  onEditBookmark,
} from "states/booksSlice";
import BookmarkModal from "components/BookmarkModal";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeIcon from "@mui/icons-material/Mode";

const Img = styled("img")({
  height: 700,
  borderRadius: 5,
  boxShadow: 2,
});

const ReadBook = () => {
  const [readingPage, setReadingPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [bookmark, setBookmark] = useState(null);

  const { libraryId, title } = useParams();

  const loading = useSelector((state) => state.books.loading);
  const pageUrl = useSelector((state) => state.books.pageUrl);

  const book = useSelector((state) => state.books.selectedBook);

  const dispatch = useDispatch();

  //? fetch book data on page render
  useEffect(() => {
    book
      ? dispatch(fetchBookData({ book, page: 0 }))
      : dispatch(fetchSingleBook({ libraryId, title }));
  }, [book, dispatch, libraryId, title]);

  //? fetch new page on readingPage change
  useEffect(() => {
    readingPage !== 0 && dispatch(fetchBookPage({ book, page: readingPage }));
  }, [book, readingPage, dispatch]);

  const handleBookmark = (edit, description, id, page) => {
    edit
      ? dispatch(onEditBookmark({ book, id, description, page }))
      : dispatch(onCreateBookmark({ book, description, page: readingPage }));
  };

  const deleteBookmark = () => {
    dispatch(
      onDeleteBookmark({
        id: bookmark.id,
      })
    );
    setBookmark(null);
    setShowDialog(false);
  };

  const onShowConfirmationModal = (description, id, page) => {
    setBookmark({ description, id, page });
    setShowDialog(true);
  };

  return (
    <PageWrapper
      showDialog={showDialog}
      dialogTitle="Elimina segnalibro"
      dialogDescription={`Procedere con l'eliminazione del segnalibro "${bookmark?.description}" ?`}
      dialogOnCancel={() => setShowDialog(false)}
      dialogOnConfirm={deleteBookmark}
    >
      <BookmarkModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        handleBookmark={handleBookmark}
        setReadingPage={setReadingPage}
        deleteBookmark={onShowConfirmationModal}
      />

      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          padding="1vh"
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
              textAlign="center"
              sx={{
                fontSize: ["20px", "25px", "25px", "25px"],
              }}
            >
              {loading ? <Skeleton variant="text" width={250} /> : book?.title}
            </Typography>
          </Grid>

          <Typography variant="subtitle1" xs={12}>
            {loading ? <Skeleton variant="text" width={100} /> : book?.author}
          </Typography>
        </Grid>
        <Grid container justifyContent="center">
          {loading ? (
            <Skeleton
              variant="rectangle"
              animation="wave"
              height={700}
              width={500}
              sx={{
                "@media (max-width : 600px)": {
                  width: 300,
                  height: 450,
                },
              }}
            />
          ) : (
            <Img
              data-testid="reading-page-image"
              sx={{
                "@media (max-width : 600px)": {
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
          padding="1vh"
        >
          <Grid>
            <Pagination
              page={readingPage}
              count={book?.pages}
              sx={{
                width: ["250px", "100%", "100%", "100%"],
              }}
              onChange={(e, page) => setReadingPage(page)}
            />
          </Grid>
          {!loading && (
            <Grid paddingTop="2vh">
              <IconButton
                data-testid="bookmark-icon-button"
                onClick={() => setShowModal(true)}
                style={{ color: "#222C4A" }}
              >
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton
                data-testid="note-icon-button"
                LinkComponent={Link}
                to={`/books/notes/${libraryId}/${title}/${readingPage}`}
                style={{ color: "#222C4A" }}
              >
                <ModeIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default ReadBook;
