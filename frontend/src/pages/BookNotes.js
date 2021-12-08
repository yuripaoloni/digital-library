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

const Img = styled("img")({
  height: 400,
  borderRadius: 5,
  boxShadow: 2,
});

const BookNotes = () => {
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

  return (
    <PageWrapper>
      <SelectNotes
        show={showDialog}
        onClose={() => setShowDialog(false)}
        readingPage={readingPage}
        setNote={setNote}
      />
      <Grid container justifyContent="center">
        <Grid container rowSpacing={3}>
          <Grid item xs data-testid="book-details-item">
            <Typography variant="h4">Note</Typography>
            <Typography variant="subtitle1" xs={12}>
              Pagina {readingPage}
            </Typography>
          </Grid>
          <Grid item xs>
            <Button onClick={() => setShowDialog(true)}>Seleziona nota</Button>
          </Grid>
        </Grid>
        <Grid item md={10} sm={11} xs={12}>
          <Grid
            container
            justifyContent={{ sm: "space-between" }}
            alignItems="center"
            rowSpacing={{ xs: 3 }}
          >
            <Grid item lg={7} md={8} sm={7} xs={12}>
              {/* //TODO inserire editor note 
                - the content should be controlled with the note state using the note.note property
                - should have a submit button to create a new note or edit an existing one note (logic will be implemented later)
                - should have a delete button
              */}
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              {loading ? (
                <Skeleton variant="rectangle" height={400} width={280} />
              ) : (
                <Img src={pageUrl} loading="lazy" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default BookNotes;
