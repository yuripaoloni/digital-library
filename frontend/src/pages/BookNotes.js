import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PageWrapper from "components/PageWrapper";
import { Grid, Typography, Skeleton } from "@mui/material";
import { onDeleteNote, onCreateNote, onEditNote } from "states/booksSlice";
import { styled } from "@mui/material/styles";
import SelectNotes from "components/SelectNotes";
import MUIRichTextEditor from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DeleteIcon from "@mui/icons-material/Delete";

const Img = styled("img")({
  height: 400,
  borderRadius: 5,
  boxShadow: 2,
});

//TODO adjust loading

const BookNotes = () => {
  const editorTheme = createTheme();
  Object.assign(editorTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: "90%",
          maxHeight: "400px",
          maxWidth: "700px",
          border: "1px solid grey",
          borderRadius: 4,
        },
        editor: {
          maxHeight: "330px",
          maxWidth: "650px",
          padding: "0 13px",
          marginTop: 2,
          marginBottom: 15,
          overflowX: "hidden",
          overflowY: "auto",
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
    setNote({
      book: null,
      id: -1,
      page: readingPage,
      note: null,
    });
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
          ></Grid>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          ></Grid>
        </Grid>
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
              <ThemeProvider theme={editorTheme}>
                <MUIRichTextEditor
                  data-testid="text-editor"
                  defaultValue={note.note && note.note.toString()}
                  label={<Typography>Start typing...</Typography>}
                  onSave={onSave}
                  controls={["bold", "italic", "bulletList", "save", "delete"]}
                  customControls={[
                    {
                      name: "delete",
                      icon: <DeleteIcon />,
                      type: "callback",
                      onClick: () => onDelete(),
                    },
                  ]}
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
              container={{ xs: true, sm: false }}
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
