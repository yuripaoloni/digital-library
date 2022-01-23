import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ConfirmDialog from "components/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import { onDeleteMember } from "states/groupsSlice";

const GroupMembersDialog = ({ showDialog, onClose, owned }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [member, setMember] = useState(null);

  const group = useSelector((state) => state.groups.selectedGroup);

  const dispatch = useDispatch();

  const handleShowConfirmDialog = (emails, id) => {
    setShowConfirmDialog(true);
    setMember({ id: id, emails: emails });
  };

  const handleDeleteMember = () => {
    dispatch(onDeleteMember(member));
    setShowConfirmDialog(false);
    onClose();
  };

  return (
    <>
      <ConfirmDialog
        title="Elimina membro"
        description="Procedere con l'eliminazione del membro ?"
        showDialog={showConfirmDialog}
        onCancel={() => setShowConfirmDialog(false)}
        onConfirm={() => handleDeleteMember()}
      />
      <Dialog
        data-testid="group-members-dialog"
        open={showDialog}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Membri del gruppo</DialogTitle>
        <DialogContent dividers>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {group && (
              <ListItem
                key={"creator"}
                data-testid={`group-member-item-creator`}
                disableGutters
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`member-picture-creator`}
                      src={`data:image/jpeg;base64,${group.creator.picture}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={`member-list-secondary-label-owner`}
                    primary={`${group.creator.name} ${group.creator.surname} (${group.creator.username})`}
                    secondary={`${group.creator.email}`}
                  />
                </ListItemButton>
              </ListItem>
            )}
            {group &&
              group?.members.length > 0 &&
              group.members.map((member, index) => (
                <ListItem
                  key={index}
                  data-testid={`group-member-item-${index}`}
                  disableGutters
                  disablePadding
                  secondaryAction={
                    owned && (
                      <IconButton
                        data-testid="remove-member-icon"
                        onClick={() =>
                          handleShowConfirmDialog([member.email], group.id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`member-picture-${index}`}
                        src={`data:image/jpeg;base64,${member.picture}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      id={`member-list-secondary-label-${index}`}
                      primary={`${member.name} ${member.surname} (${member.username})`}
                      secondary={`${member.email}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Chiudi</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupMembersDialog;
