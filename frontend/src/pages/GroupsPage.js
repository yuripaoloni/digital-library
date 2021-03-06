import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography, Button, Stack, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  onDeleteGroup,
  onExitGroup,
  onFetchGroups,
  selectGroup,
} from "states/groupsSlice";
import PageWrapper from "components/PageWrapper";
import GroupModal from "components/GroupModal";
import GroupItem from "components/GroupItem";
import GroupMembersDialog from "components/GroupMembersDialog";
import GroupNotesList from "components/GroupNotesList";

const GroupsPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showMembersDialog, setShowMembersDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);

  const [confirmDialogContent, setConfirmDialogContent] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
  });
  const [owned, setOwned] = useState(false);

  const createdGroups = useSelector((state) => state.groups.createdGroups);
  const joinedGroups = useSelector((state) => state.groups.joinedGroups);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.groups.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onFetchGroups());
  }, [dispatch]);

  const handleShowConfirmDialog = (book, title, description, exit) => {
    dispatch(selectGroup(book));
    setConfirmDialogContent({
      title,
      description,
      onConfirm: exit ? () => handleExitGroup() : () => handleDeleteGroup(),
    });
    setShowConfirmDialog(true);
  };

  const handleShowMembersDialog = (book, owned) => {
    dispatch(selectGroup(book));
    setShowMembersDialog(true);
    setOwned(owned);
  };

  const handleShowSharedNotes = (book) => {
    dispatch(selectGroup(book));
    setShowNotesDialog(true);
  };

  const handleCreateGroup = () => {
    dispatch(selectGroup(null));
    setShowGroupModal(true);
  };

  const handleDeleteGroup = () => {
    dispatch(onDeleteGroup());
    setShowConfirmDialog(false);
  };

  const handleExitGroup = () => {
    dispatch(onExitGroup());
    setShowConfirmDialog(false);
  };

  const handleEditGroup = (book) => {
    dispatch(selectGroup(book));
    setShowGroupModal(true);
  };

  return (
    <PageWrapper
      reducer="groups"
      showDialog={showConfirmDialog}
      dialogTitle={confirmDialogContent.title}
      dialogDescription={confirmDialogContent.description}
      dialogOnCancel={() => setShowConfirmDialog(false)}
      dialogOnConfirm={confirmDialogContent.onConfirm}
    >
      <GroupModal
        show={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      />
      <GroupMembersDialog
        showDialog={showMembersDialog}
        onClose={() => setShowMembersDialog(false)}
        owned={owned}
      />
      <GroupNotesList
        show={showNotesDialog}
        onClose={() => setShowNotesDialog(false)}
      />
      <Box px={2}>
        <Grid container alignItems="center" columnSpacing={4}>
          <Grid item>
            <Typography variant="h4">Gruppi creati</Typography>
          </Grid>
          <Grid item>
            <Button
              data-testid="create-group-button"
              variant="outlined"
              onClick={() => handleCreateGroup()}
            >
              Crea nuovo gruppo
            </Button>
          </Grid>
        </Grid>
        <Stack direction="row" mt={3} mb={1} flexWrap="wrap">
          {loading
            ? Array(3)
                .fill(0)
                .map((i, index) => <GroupItem key={index} group={false} />)
            : createdGroups.length > 0
            ? createdGroups.map((createdGroup, index) => (
                <GroupItem
                  key={index}
                  group={createdGroup}
                  owned
                  onDelete={handleShowConfirmDialog}
                  onShowMembers={handleShowMembersDialog}
                  onEdit={handleEditGroup}
                  onShowNotes={handleShowSharedNotes}
                />
              ))
            : "Nessun risultato"}
        </Stack>
        <Divider />
        <Grid item xs={12} mt={2}>
          <Typography variant="h4">Altri gruppi</Typography>
          <Stack direction="row" mt={3} mb={1} flexWrap="wrap">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((i, index) => <GroupItem key={index} group={false} />)
              : joinedGroups.length > 0
              ? joinedGroups.map((joinedGroup, index) => (
                  <GroupItem
                    key={index}
                    group={joinedGroup}
                    owned={joinedGroup.members.find(
                      (member) => member.email === user.email && member.isAdmin
                    )}
                    onDelete={handleShowConfirmDialog}
                    onShowMembers={handleShowMembersDialog}
                    onEdit={handleEditGroup}
                    onShowNotes={handleShowSharedNotes}
                  />
                ))
              : "Nessun risultato"}
          </Stack>
        </Grid>
      </Box>
    </PageWrapper>
  );
};

export default GroupsPage;
