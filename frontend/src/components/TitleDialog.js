import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TitleDialog = ({ show, title, onClose, onSave }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(title);
  }, [title]);

  return (
    <Dialog data-testid="title-dialog" open={show} onClose={onClose}>
      <DialogTitle>Salva nota</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Aggiungi o modifica il titolo della nota
        </DialogContentText>
        <TextField
          fullWidth
          autoCapitalize=""
          placeholder="Titolo nota..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancella</Button>
        <Button onClick={() => onSave(text)}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TitleDialog;
