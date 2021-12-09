import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

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
        <Divider />
        <ListItem
          button
          onClick={() =>
            handleSelection({
              book: null,
              id: -1,
              page: readingPage,
              note: null,
            })
          }
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Crea nuova nota" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default SelectNotes;
