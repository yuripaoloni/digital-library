import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogContentText,
  DialogContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import DefaultImage from "assets/book.jpg";

const Img = styled("img")({
  height: 50,
  borderRadius: 5,
  boxShadow: 2,
});

const GroupNotesList = ({ show, onClose }) => {
  const group = useSelector((state) => state.groups.selectedGroup);

  const navigate = useNavigate();

  return (
    <Dialog onClose={onClose} open={show} data-testid="group-notes-dialog">
      <DialogTitle>Note condivise</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Seleziona una nota per andare alla pagina degli appunti
        </DialogContentText>
        <List dense>
          {group && group?.notes?.length > 0 ? (
            group.notes.map((note, index) => (
              <ListItem
                key={index}
                disableGutters
                data-testid={`group-note-item-${index}`}
                button
                onClick={() =>
                  navigate(
                    `/books/notes/${note.book.library.id}/${note.book.title}/${note.page}`
                  )
                }
              >
                <ListItemAvatar>
                  <Img
                    src={note.book?.cover || DefaultImage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = DefaultImage;
                    }}
                    loading="eager"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={note.title}
                  secondary={`${note.book.title} (Pagina ${note.page})`}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="subtitle2">
              Nessuna nota condivisa in questo gruppo
            </Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default GroupNotesList;
