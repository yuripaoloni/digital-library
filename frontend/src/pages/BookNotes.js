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
  setError,
} from "states/booksSlice";
import { styled } from "@mui/material/styles";
import SelectNotes from "components/SelectNotes";
import TextEditor from "components/TextEditor";
import Spinner from "components/Spinner";
import TitleDialog from "components/TitleDialog";
import SelectGroup from "components/SelectGroup";
import { onShareNote, onUnshareNote } from "states/groupsSlice";

const Img = styled("img")({
  height: 850,
  borderRadius: 10,
  boxShadow: 2,
});

const BookNotes = () => {
  const { libraryId, title, readingPage } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  //TODO update the note object with the fields used to distinguish the shared notes (e.g. user, groupId, groupName)
  const [note, setNote] = useState({
    book: null,
    id: -1,
    page: readingPage,
    title: "",
    description: "",
    timestamp: null,
  });

  const [confirmDialogContent, setConfirmDialogContent] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const noteLoading = useSelector((state) => state.books.noteLoading);
  const loading = useSelector((state) => state.books.singleBookLoading);
  const shareLoading = useSelector((state) => state.groups.loading);
  const book = useSelector((state) => state.books.selectedBook);
  const pageUrl = useSelector((state) => state.books.pageUrl);
  const username = useSelector((state) => state.auth.user.username);

  const dispatch = useDispatch();

  useEffect(() => {
    !book && dispatch(fetchSingleBook({ libraryId, title, page: readingPage }));
  }, [book, dispatch, libraryId, title, pageUrl, readingPage]);

  const handleShowTitleDialog = (data) => {
    setNote((prev) => {
      return {
        ...prev,
        page: readingPage,
        book: book,
        description: data.toString(),
      };
    });
    setShowTitleDialog(true);
  };

  const handleShowConfirmDialog = (title, description, onConfirm) => {
    setConfirmDialogContent({
      title,
      description,
      onConfirm,
    });
    setShowConfirmDialog(true);
  };

  const onSave = (noteTitle) => {
    setNote((prev) => {
      return {
        ...prev,
        title: noteTitle,
      };
    });

    //? id = -1 means new note
    note.id === -1
      ? dispatch(
          onCreateNote({
            book: book,
            page: readingPage,
            description: note.description,
            title: noteTitle,
          })
        )
      : dispatch(
          onEditNote({
            book: book,
            page: readingPage,
            timestamp: note.timestamp,
            title: noteTitle,
            description: note.description,
            id: note.id,
          })
        );

    setShowTitleDialog(false);
  };

  const onDelete = () => {
    dispatch(
      onDeleteNote({
        id: note.id,
      })
    );
    setNote({
      book: null,
      id: -1,
      page: readingPage,
      description: "",
      title: "",
      timestamp: null,
    });
    setShowConfirmDialog(false);
  };

  const handleNoteShare = (groupId) => {
    //? id = -1 means new note
    note.id === -1
      ? dispatch(
          setError(
            "La nota deve essere salvata prima di essere condivisa con un gruppo"
          )
        )
      : dispatch(onShareNote({ groupId, noteId: note.id }));
  };

  const handleNoteUnshare = () => {
    handleShowConfirmDialog(
      `Annulla condivisione nota", "Procedere con l'annullamento della condivisione della nota "${note.title}" ?`,
      () => dispatch(onUnshareNote({ groupId: note.groupId, noteId: note.id }))
    );
  };

  if (noteLoading || shareLoading) return <Spinner />;

  return (
    <PageWrapper
      reducer="books"
      showDialog={showConfirmDialog}
      dialogTitle={confirmDialogContent.title}
      dialogDescription={confirmDialogContent.description}
      dialogOnCancel={() => setShowConfirmDialog(false)}
      dialogOnConfirm={confirmDialogContent.onConfirm}
    >
      <SelectNotes
        show={showDialog}
        onClose={() => setShowDialog(false)}
        readingPage={readingPage}
        setNote={setNote}
      />
      <SelectGroup
        show={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        onShareNote={handleNoteShare}
      />
      <TitleDialog
        show={showTitleDialog}
        onClose={() => setShowTitleDialog(false)}
        title={note.title}
        onSave={onSave}
      />
      <Grid pl={2} pb={2}>
        {loading ? (
          <Skeleton variant="text" width="80%" />
        ) : (
          <Typography variant="h5">{title}</Typography>
        )}
        {loading ? (
          <Skeleton variant="text" width="40%" />
        ) : (
          <Typography variant="subtitle1">Pagina {readingPage}</Typography>
        )}
        <Grid item xs={12}>
          <Grid
            container
            direction={{ sm: "row" }}
            mt={4}
            justifyContent="space-between"
          >
            <Grid
              item
              sm={6}
              pr={2}
              xs={12}
              container
              direction="column"
              justifyContent="center"
              sx={{ height: "100%", width: "100%" }}
            >
              {loading ? (
                <Skeleton variant="text" width="80%" />
              ) : (
                <Typography variant="h6">
                  {note.title ? note.title : "Nuova nota"}
                </Typography>
              )}
              {loading ? (
                <Skeleton variant="text" width="40%" />
              ) : (
                <Typography variant="subtitle2">
                  {note.timestamp && `${note.timestamp}`}
                </Typography>
              )}

              {loading ? (
                <Skeleton
                  variant="rectangle"
                  sx={{
                    "@media (min-width : 1161px)": {
                      height: 700,
                      width: 500,
                    },
                    "@media (max-width : 1160px)": {
                      height: 700,
                      width: 500,
                    },
                    "@media (max-width : 953px)": {
                      height: 600,
                      width: 400,
                    },
                    "@media (max-width : 825px)": {
                      height: 500,
                      width: 300,
                    },
                    "@media (max-width : 690px)": {
                      height: 450,
                      width: 200,
                    },
                  }}
                />
              ) : (
                <TextEditor
                  note={note.description}
                  onSave={handleShowTitleDialog}
                  onDelete={() =>
                    note.title &&
                    handleShowConfirmDialog(
                      "Elimina nota",
                      `Procedere con l'eliminazione della nota "${note.title}" ?`,
                      () => onDelete()
                    )
                  }
                  onSelectNotes={() => setShowDialog(true)}
                  onShare={() => setShowShareDialog(true)}
                  onUnshare={handleNoteUnshare}
                  //TODO shared={note?.groupId ? true : false}
                  //TODO removable={note?.groupId ? note.user.username === username ? true : false : true}
                />
              )}
            </Grid>
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sm={6}
              xs={12}
            >
              {loading ? (
                <Skeleton
                  data-testid
                  variant="rectangle"
                  sx={{
                    "@media (min-width : 1161px)": {
                      height: 700,
                      width: 500,
                    },
                    "@media (max-width : 1160px)": {
                      height: 700,
                      width: 500,
                    },
                    "@media (max-width : 953px)": {
                      height: 600,
                      width: 400,
                    },
                    "@media (max-width : 825px)": {
                      height: 500,
                      width: 300,
                    },
                    "@media (max-width : 690px)": {
                      height: 450,
                      width: 200,
                    },
                  }}
                />
              ) : (
                <Img
                  src={pageUrl}
                  sx={{
                    "@media (max-width : 1180px)": {
                      height: 700,
                    },
                    "@media (max-width : 953px)": {
                      height: 600,
                    },
                    "@media (max-width : 825px)": {
                      height: 500,
                    },
                    "@media (max-width : 690px)": {
                      height: 450,
                    },
                  }}
                  loading="eager"
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
export default BookNotes;
