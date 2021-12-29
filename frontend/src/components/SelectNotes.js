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
  //TODO note should now contain also the shared notes coming from the groups the user participates in
  const notes = useSelector((state) => state.books.notes);

  const handleSelection = (note) => {
    setNote(note);
    onClose();
  };

  //TODO based on the fields added in the shared notes objects (e.g. user: {} or groupId: 1, groupName: "abc"),
  //TODO change the background color of the note or something similar to distinguish them

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
                    <ArticleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={note.title} secondary={note.timestamp} />
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
