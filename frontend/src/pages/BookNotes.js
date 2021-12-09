import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PageWrapper from "components/PageWrapper";
import { Grid, Typography, Skeleton, Button } from "@mui/material";
import { onDeleteNote, onCreateNote, onEditNote } from "states/booksSlice";
import { styled } from "@mui/material/styles";
import SelectNotes from "components/SelectNotes";
import MUIRichTextEditor from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const Img = styled("img")({
  height: 400,
  borderRadius: 5,
  boxShadow: 2,
});

const BookNotes = () => {
  const editorTheme = createTheme();
  Object.assign(editorTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: "90%",
          marginTop: 30,
          marginLeft: 10,
          border: "1px solid grey",
          borderRadius: 4,
          maxWidth: "100vh",
          maxHeight: "80vh",
        },
        editor: {
          display: "block",
          maxHeight: "80vh",
          maxWidth: "80vh",
          padding: "0 13px",
          marginTop: 2,
          marginBottom: 15,
        },
        container: {
          display: "flex",
          flexDirection: "column",
          margin: 0,
        },
        toolbar: {
          display: "block",
          order: 2,
          position: "relative",
        },
        placeHolder: {
          position: "relative",
        },
        editorContainer: {
          padding: 13,
          margin: 0,
          fontSize: 13,
        },
      },
    },
  });
  const { page, index, readingPage } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [note, setNote] = useState({
    book: null,
    id: -1,
    page: readingPage,
    note: null,
  });

  const loading = useSelector((state) => state.books.loading);
  const book = useSelector((state) =>
    state.books.books.length > 0 ? state.books.books[page][index] : false
  );
  const pageUrl = useSelector((state) => state.books.pageUrl);

  const dispatch = useDispatch();

  //TODO improve general layout & implement onDelete

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
  };

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
        <Grid container rowSpacing={3}>
          <Grid
            item
            xs
            container
            direction="column"
            sx={{
              marginLeft: "20px",
            }}
            data-testid="book-details-item"
          >
            {/* <Typography variant="h4">Note</Typography>
            <Typography variant="subtitle1" xs={12}>
              Pagina {readingPage}
            </Typography> */}
          </Grid>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={() => setShowDialog(true)}>seleziona nota</Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Grid
              item
              sm={5}
              container
              direction="column"
              justifyContent="start"
              sx={{
                height: "inherit",
              }}
            >
              <ThemeProvider theme={editorTheme}>
                <MUIRichTextEditor
                  defaultValue={note.note && note.note.toString()}
                  label={
                    <Typography sx={{ marginLeft: "20px" }}>
                      Start typing...
                    </Typography>
                  }
                  onSave={onSave}
                  controls={["bold", "italic", "bulletList", "save", "clear"]}
                  inlineToolbar
                />
              </ThemeProvider>

              <Grid
                container
                direction="column"
                sx={{ margin: "50px 0 0 0px" }}
              ></Grid>
            </Grid>
            <Grid
              item
              justifyContent="center"
              alignItems="center"
              sm={3}
              sx={{
                marginTop: "50px",
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
              <IconButton onClick={() => setShowDialog(true)}>
                {" "}
                <LibraryBooksIcon />{" "}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default BookNotes;
