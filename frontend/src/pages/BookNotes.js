import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PageWrapper from "components/PageWrapper";
import { Grid, Typography, Skeleton } from "@mui/material";
import {
  onDeleteNote,
  onCreateNote,
  onEditNote,
  fetchSingleBook,
} from "states/booksSlice";
import { styled } from "@mui/material/styles";
import SelectNotes from "components/SelectNotes";
import IconButton from "@mui/material/IconButton";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TextEditor from "components/TextEditor";
import Spinner from "components/Spinner";

const Img = styled("img")({
  height: 400,
  borderRadius: 5,
  boxShadow: 2,
});

const BookNotes = () => {
  const { libraryId, title, readingPage } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [note, setNote] = useState({
    book: null,
    id: -1,
    page: readingPage,
    note: null,
  });

  const noteLoading = useSelector((state) => state.books.noteLoading);
  const loading = useSelector((state) => state.books.loading);
  const book = useSelector((state) => state.books.selectedBook);
  const pageUrl = useSelector((state) => state.books.pageUrl);

  const dispatch = useDispatch();

  //TODO fix this function
  useEffect(() => {
    !book && dispatch(fetchSingleBook({ libraryId, title, page: readingPage }));
  }, [book, dispatch, libraryId, title, pageUrl, readingPage]);

  const onSave = (data) => {
    setNote((prev) => {
      return { ...prev, page: readingPage, book: book, note: data.toString() };
    });
    //? id = -1 means new note
    note.id === -1
      ? dispatch(
          onCreateNote({ book: book, page: readingPage, note: data.toString() })
        )
      : dispatch(
          onEditNote({
            book: book,
            page: readingPage,
            note: data.toString(),
            id: note.id,
          })
        );
  };

  const onDelete = () => {
    dispatch(
      onDeleteNote({
        book: book,
        page: readingPage,
        note: note.note,
        id: note.id,
      })
    );
    setNote({
      book: null,
      id: -1,
      page: readingPage,
      note: null,
    });
  };

  if (noteLoading) return <Spinner />;

  return (
    <PageWrapper>
      <SelectNotes
        show={showDialog}
        onClose={() => setShowDialog(false)}
        readingPage={readingPage}
        setNote={setNote}
      />
      <Grid
        container
        justifyContent="center"
        sx={{
          maxWidth: "100%",
          alignItems: "baseline",
        }}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
            sx={{ marginTop: "20px" }}
          >
            <Grid
              item
              sm={5}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ position: "relative" }}
            >
              {loading ? (
                <Skeleton variant="rectangle" height={200} width={300} />
              ) : (
                <TextEditor
                  note={note.note}
                  onSave={onSave}
                  onDelete={onDelete}
                />
              )}
            </Grid>
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sm={3}
              sx={{
                paddingTop: "20px",
              }}
            >
              {loading ? (
                <Skeleton variant="rectangle" height={400} width={280} />
              ) : (
                <Img src={pageUrl} loading="lazy" />
              )}
              <Typography variant="subtitle1" xs={12}>
                Pagina {readingPage}
              </Typography>
              <IconButton
                onClick={() => setShowDialog(true)}
                data-testid="delete-icon"
              >
                <LibraryBooksIcon data-testid="select-note" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
export default BookNotes;
