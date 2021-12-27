import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Spinner from "components/Spinner";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "50%",
  minHeight: "20%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const BookmarkModal = ({
  showModal,
  onClose,
  handleBookmark,
  setReadingPage,
  deleteBookmark,
}) => {
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [bookmarkPage, setBookmarkPage] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const bookmarkLoading = useSelector((state) => state.books.bookmarkLoading);
  const bookmarks = useSelector((state) => state.books.bookmarks);

  const resetStates = () => {
    setDescription("");
    setBookmarkId(null);
    setBookmarkPage(null);
    setSelectedItemIndex(null);
  };

  const selectBookmark = (page) => {
    resetStates();
    setReadingPage(page);
    onClose();
  };

  const editMode = (description, id, page, index) => {
    setEdit(true);
    setDescription(description);
    setBookmarkId(id);
    setBookmarkPage(page);
    setSelectedItemIndex(index);
  };

  const handleClose = () => {
    resetStates();
    setEdit(false);
    onClose();
  };

  const onSubmit = (edit, description, bookmarkId, bookmarkPage) => {
    handleBookmark(edit, description, bookmarkId, bookmarkPage);
    resetStates();
    setEdit(false);
  };

  return (
    <Modal
      data-testid="bookmark-modal"
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {bookmarkLoading ? (
          <Spinner />
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h5">
              Segnalibri
            </Typography>
            <List sx={{ pt: 0 }} dense>
              {bookmarks?.length > 0 ? (
                bookmarks.map((bookmark, index) => (
                  <ListItem
                    disableGutters
                    selected={selectedItemIndex === index}
                    data-testid={`bookmark-item-${index}`}
                    key={index}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <BookmarkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={bookmark.description}
                      secondary={`Pagina ${bookmark.page}`}
                    />
                    <IconButton
                      data-testid="page-bookmark-icon"
                      onClick={() => selectBookmark(bookmark.page)}
                    >
                      <FileOpenIcon />
                    </IconButton>
                    <IconButton
                      data-testid="edit-bookmark-icon"
                      onClick={() =>
                        editMode(
                          bookmark.description,
                          bookmark.id,
                          bookmark.page,
                          index
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      data-testid="delete-bookmark-icon"
                      onClick={() =>
                        deleteBookmark(
                          bookmark.description,
                          bookmark.id,
                          bookmark.page
                        )
                      }
                    >
                      <BookmarkRemoveIcon />
                    </IconButton>
                  </ListItem>
                ))
              ) : (
                <Typography>Nessun segnalibro aggiunto</Typography>
              )}
              <Divider sx={{ my: 1 }} />
              <Typography id="modal-modal-title" variant="h6">
                {edit ? "Modifica" : "Nuovo"} segnalibro
              </Typography>
              <ListItem disableGutters>
                <TextField
                  fullWidth
                  autoCapitalize=""
                  placeholder="Descrizione..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  helperText="Il segnalibro sarà aggiunto per la pagina corrente"
                  FormHelperTextProps={{ sx: { margin: 0 } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          data-testid="submit-bookmark-icon"
                          onClick={() =>
                            onSubmit(
                              edit,
                              description,
                              bookmarkId,
                              bookmarkPage
                            )
                          }
                        >
                          <BookmarkAddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default BookmarkModal;
