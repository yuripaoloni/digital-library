import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//TODO check "note" object fields are correct

const GroupNotesList = ({ show, onClose }) => {
  const group = useSelector((state) => state.groups.selectedGroup);

  return (
    <Dialog onClose={onClose} open={show}>
      <DialogTitle>Note condivise</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Seleziona una nota per andare alla pagina degli appunti
        </DialogContentText>
        <List dense>
          {group
            ? group.notes.map((note, index) => (
                <ListItem
                  key={index}
                  disableGutters
                  data-testid={`group-note-item-${index}`}
                  button
                  LinkComponent={Link}
                  to={`/books/notes/${note.book.library.id}/${note.book.title}/${note.page}`}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <GroupIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={note.title}
                    secondary={note.user.username}
                  />
                </ListItem>
              ))
            : "Nessuna nota condivisa in questo gruppo"}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default GroupNotesList;
