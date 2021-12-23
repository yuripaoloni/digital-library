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
import Skeleton from "@mui/material/Skeleton";
import CardHeader from "@mui/material/CardHeader";

import { searchUser } from "api";
import { onCreateGroup, setError } from "states/groupsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "40%",
  minHeight: "20%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

//TODO array for added elements o usa find per elements in checked

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
      setChecked([]);
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
    let emails = checked.map((item) => users[item].email);
    dispatch(onCreateGroup({ emails, name: groupName }));
    onClose();
    setSearch("");
    setGroupName("");
    setUsers([]);
    setChecked([]);
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
                            style={{ marginBottom: 6 }}
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
        <Button onClick={() => onSubmit()}>CREA</Button>
      </Box>
    </Modal>
  );
};

export default GroupModal;
