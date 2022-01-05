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

const SelectGroup = ({ show, onClose, onShareNote }) => {
  const groups = useSelector((state) =>
    state.groups.createdGroups.concat(state.groups.joinedGroups)
  );

  return (
    <Dialog
      onClose={onClose}
      open={show}
      data-testid="select-group-sharing-dialog"
    >
      <DialogTitle>Condivisione nota</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Seleziona il gruppo in cui condividere la nota
        </DialogContentText>
        <List dense>
          {groups.map((group, index) => (
            <ListItem
              key={index}
              disableGutters
              data-testid={`group-share-item-${index}`}
              button
              onClick={() => onShareNote(group)}
            >
              <ListItemAvatar>
                <Avatar>
                  <GroupIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={group.name}
                secondary={group.creator.username}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default SelectGroup;
