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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import ConfirmDialog from "components/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import { onDeleteMember, onEditGroup } from "states/groupsSlice";

const GroupMembersDialog = ({ showDialog, onClose, owned }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const group = useSelector((state) => state.groups.selectedGroup);

  const dispatch = useDispatch();

  const handleShowConfirmDialog = (title, description, onConfirm) => {
    setConfirmDialog({ title, description, onConfirm });
    setShowConfirmDialog(true);
  };

  const handleDeleteMember = (id, emails) => {
    dispatch(onDeleteMember({ id, emails }));
    setShowConfirmDialog(false);
    onClose();
  };

  const handleUserAdmin = (users) => {
    dispatch(onEditGroup({ users, name: group.name }));
    setShowConfirmDialog(false);
    onClose();
  };

  return (
    <>
      <ConfirmDialog
        title={confirmDialog.title}
        description={confirmDialog.description}
        showDialog={showConfirmDialog}
        onCancel={() => setShowConfirmDialog(false)}
        onConfirm={confirmDialog.onConfirm}
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
                >
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
                  {owned && (
                    <>
                      <IconButton
                        data-testid="remove-member-icon"
                        onClick={() =>
                          handleShowConfirmDialog(
                            "Rimuovi utente",
                            "Procedere con la rimozione dell'utente dal gruppo?",
                            () => handleDeleteMember(group.id, [member.email])
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        data-testid={
                          member.isAdmin
                            ? "remove-admin-icon"
                            : "add-admin-icon"
                        }
                        onClick={() =>
                          handleShowConfirmDialog(
                            "Gestisci admin",
                            member.isAdmin
                              ? "Procedere con la rimozione delle funzionalità admin all'utente selezionato?"
                              : "Procedere con l'aggiunta delle funzionalità admin all'utente selezionato?",
                            () =>
                              handleUserAdmin([
                                ...group.members,
                                {
                                  email: member.email,
                                  isAdmin: !member.isAdmin,
                                },
                              ])
                          )
                        }
                      >
                        {member.isAdmin ? (
                          <RemoveModeratorIcon />
                        ) : (
                          <AddModeratorIcon />
                        )}
                      </IconButton>
                    </>
                  )}
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
