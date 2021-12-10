import React, { useState } from "react";
import { useParams, Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PageWrapper from "components/PageWrapper";
import { Grid, Typography } from "@mui/material";
import { onDeleteNote, onCreateNote, onEditNote } from "states/booksSlice";
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
  const { page, index, readingPage } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [note, setNote] = useState({
    book: null,
    id: -1,
    page: readingPage,
    note: null,
  });

  const loading = useSelector((state) => state.books.noteLoading);
  const book = useSelector((state) =>
    state.books.books.length > 0 ? state.books.books[page][index] : false
  );
  const pageUrl = useSelector((state) => state.books.pageUrl);

  const dispatch = useDispatch();

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

  if (loading) return <Spinner />;

  //? if no pageUrl is set, redirect to /. Happens if user try to go directly on /read/0/0/0 without passing from / or /books
  if (!loading && !pageUrl) return <Navigate to="/" />;

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
              <TextEditor
                note={note.note}
                onSave={onSave}
                onDelete={onDelete}
              />
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
              <Img src={pageUrl} loading="lazy" />
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
