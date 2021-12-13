import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmDialog = ({
  showDialog,
  title,
  description,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog
      open={showDialog}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          Cancella
        </Button>
        <Button onClick={onConfirm}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
