import React, { useState } from "react";
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

import { searchUser } from "api";
import { onCreateGroup, setError } from "states/groupsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "50%",
  minHeight: "20%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const GroupModal = ({ show, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState([]);

  const groupsLoading = useSelector((state) => state.groups.loading);

  const dispatch = useDispatch();

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const fetchUsers = async (param) => {
    try {
      const res = await searchUser(param);
      setUsers(res.data);
    } catch (err) {
      dispatch(setError());
    }
  };

  const onSearch = (text) => {
    setSearch(text);
    if (text.length === 0) {
      setUsers([]);
      setChecked([]);
    }
    if (text.length > 2) {
      setSearchLoading(true);
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(
        setTimeout(() => {
          fetchUsers(text);
          setSearchLoading(false);
        }, 1500)
      );
    }
  };

  const onSubmit = () => {
    let emails = checked.map((item) => users[item].email);
    dispatch(onCreateGroup({ emails, name: groupName }));
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
              Gruppo
            </Typography>
            <TextField
              fullWidth
              label="Nome"
              autoCapitalize=""
              placeholder="Nome..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              FormHelperTextProps={{ sx: { margin: 0 } }}
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
              }}
            />
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {users.map((user, index) => (
                <ListItem
                  key={index}
                  disableGutters
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={() => handleToggle(index)}
                      checked={checked.indexOf(index) !== -1}
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
        <Button onClick={() => onSubmit()}>INVIA</Button>
      </Box>
    </Modal>
  );
};

export default GroupModal;
