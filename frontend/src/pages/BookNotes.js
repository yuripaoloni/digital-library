import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PageWrapper from "components/PageWrapper";
import { Grid, Typography, Skeleton, Paper, Button } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { onDeleteNote } from "states/booksSlice";
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
  //? has book, id, page, note properties
  const [note, setNote] = useState({
    book: {},
    id: 0,
    page: readingPage,
    note: "",
  });

  const loading = useSelector((state) => state.books.loading);
  const notes = useSelector((state) => state.books.notes);
  const pageUrl = useSelector((state) => state.books.pageUrl);

  const dispatch = useDispatch();

  //? note hardcoded solo per pag 0 e 1

  //TODO improve general layout

  const save = (data) => {
    console.log(data);
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
          backgroundColor: "red",
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
          ></Grid>
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
              {/* //TODO inserire editor note 
                - the content should be controlled with the note state using the note.note property
                - should have a submit button to create a new note or edit an existing one note (logic will be implemented later)
                - should have a delete button
              */}
              <ThemeProvider theme={editorTheme}>
                <MUIRichTextEditor
                  label={
                    <Typography sx={{ marginLeft: "20px" }}>
                      Start typing...
                    </Typography>
                  }
                  onSave={save}
                  controls={["bold", "italic", "bulletList", "save", "clear"]}
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
