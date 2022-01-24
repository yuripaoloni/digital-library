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
import GroupIcon from "@mui/icons-material/Group";

import { useSelector } from "react-redux";

const SelectNotes = ({ show, onClose, readingPage, setNote }) => {
  const notes = useSelector((state) => state.books.notes);

  const handleSelection = (note) => {
    setNote((prev) => {
      return { ...note };
    });
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={show}>
      <DialogTitle>Seleziona nota</DialogTitle>
      <List sx={{ pt: 0 }} dense>
        {notes.map(
          (note, index) =>
            note.page.toString() === readingPage && (
              <ListItem
                data-testid={`note-item-${index}`}
                button
                onClick={() => handleSelection(note)}
                key={index}
              >
                <ListItemAvatar>
                  <Avatar>
                    {note?.group ? <GroupIcon /> : <ArticleIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={note.title}
                  secondary={note?.group ? note.group.name : note.timestamp}
                />
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
              description: "",
              title: "",
              timestamp: null,
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
