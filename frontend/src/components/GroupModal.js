import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Spinner from "components/Spinner";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import Skeleton from "@mui/material/Skeleton";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { searchUser } from "api";
import { onCreateGroup, onEditGroup, setError } from "states/groupsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "45%",
  minHeight: "20%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 2,
};

const GroupModal = ({ show, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const groupsLoading = useSelector((state) => state.groups.loading);
  const selectedGroup = useSelector((state) => state.groups.selectedGroup);
  const username = useSelector((state) => state.auth.user.username);

  useEffect(() => {
    setSearch("");
    setUsers([]);
    if (selectedGroup) {
      let emails = selectedGroup.members.map((member) => {
        return { email: member.email, isAdmin: member.isAdmin };
      });
      setGroupName(selectedGroup.name);
      setAddedUsers(emails);
      setEditMode(true);
    } else {
      //? new group button clicked
      setGroupName("");
      setAddedUsers([]);
      setEditMode(false);
    }
  }, [selectedGroup]);

  const dispatch = useDispatch();

  const handleToggle = (email) => {
    const currentIndex = addedUsers.indexOf(email);
    const updatedUsers = [...addedUsers];

    if (currentIndex === -1) {
      updatedUsers.push({ email: email, isAdmin: false });
    } else {
      updatedUsers.splice(currentIndex, 1);
    }

    setAddedUsers(updatedUsers);
  };

  const fetchUsers = async (param) => {
    try {
      const res = await searchUser(param);
      let users = res.data.filter((item) => item.username !== username);
      setUsers(users);
      setSearchLoading(false);
    } catch (err) {
      dispatch(setError());
      setSearchLoading(false);
    }
  };

  const onSearch = (text) => {
    setSearch(text);
    if (text.length === 0) {
      setUsers([]);
    }
    if (text.length > 2) {
      setSearchLoading(true);
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(
        setTimeout(() => {
          fetchUsers(text);
        }, 1500)
      );
    }
  };

  const onSubmit = () => {
    dispatch(
      editMode
        ? onEditGroup({ users: addedUsers, name: groupName })
        : onCreateGroup({ users: addedUsers, name: groupName })
    );
    onClose();
    setSearch("");
    setGroupName("");
    setUsers([]);
    setAddedUsers([]);
  };

  return (
    <Modal
      data-testid="group-modal"
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {groupsLoading ? (
          <Spinner />
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h5">
              {editMode ? "Modifica" : "Nuovo"} Gruppo
            </Typography>
            <TextField
              fullWidth
              label="Nome"
              autoCapitalize=""
              placeholder="Nome..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              FormHelperTextProps={{ sx: { margin: 0 } }}
              sx={{ my: 3 }}
              inputProps={{ "data-testid": "group-name-textbox" }}
            />
            <TextField
              fullWidth
              autoCapitalize=""
              label="Cerca utente..."
              placeholder="Inserisci username, nome, cognome o email"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              helperText="Almeno 3 caratteri per iniziare la ricerca"
              FormHelperTextProps={{ sx: { margin: 0 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchLoading && <Spinner />}
                  </InputAdornment>
                ),
                "data-testid": "search-user-group-textbox",
              }}
            />
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
              }}
            >
              {addedUsers.length > 0 &&
                addedUsers.map((addedUser, index) => (
                  <Chip
                    size="small"
                    key={index}
                    sx={{ mb: 1, mr: 1 }}
                    label={addedUser.email}
                    onDelete={() => handleToggle(addedUser)}
                  />
                ))}
            </Stack>
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {searchLoading
                ? Array(2)
                    .fill(0)
                    .map((i, index) => (
                      <CardHeader
                        key={index}
                        avatar={
                          <Skeleton
                            animation="wave"
                            variant="circular"
                            width={40}
                            height={40}
                          />
                        }
                        title={
                          <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 4 }}
                          />
                        }
                        subheader={
                          <Skeleton animation="wave" height={10} width="40%" />
                        }
                      />
                    ))
                : users.map((user, index) => (
                    <ListItem
                      key={index}
                      disableGutters
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={() => handleToggle(user.email)}
                          checked={addedUsers.some(
                            (addedUser) => addedUser.email === user.email
                          )}
                          inputProps={{
                            "aria-labelledby": `checkbox-list-secondary-label-${index}`,
                          }}
                        />
                      }
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            alt={`user-picture-${index}`}
                            src={`data:image/jpeg;base64,${user.picture}`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          id={`checkbox-list-secondary-label-${index}`}
                          primary={`${user.name} ${user.surname} (${user.username})`}
                          secondary={`${user.email}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
            </List>
          </>
        )}
        <Button
          data-testid="group-modal-submit"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => onSubmit()}
        >
          {editMode ? "Modifica" : "Crea"}
        </Button>
      </Box>
    </Modal>
  );
};

export default GroupModal;
