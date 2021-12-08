import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { useSelector, useDispatch } from "react-redux";

const SelectNotes = ({ show, onClose, readingPage, setNote }) => {
  const notes = useSelector((state) => state.books.notes);

  const handleSelection = (note) => {
    setNote(note);
    onClose();
  };

  //TODO improve layout

  return (
    <Dialog onClose={onClose} open={show}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {notes.map(
          (note, index) =>
            note.page.toString() === readingPage && (
              <ListItem
                button
                onClick={() => handleSelection(note)}
                key={index}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ArticleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={note.note} />
              </ListItem>
            )
        )}
      </List>
    </Dialog>
  );
};

export default SelectNotes;
