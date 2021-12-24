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

const GroupsPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showMembersDialog, setShowMembersDialog] = useState(false);
  const [confirmDialogContent, setConfirmDialogContent] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
  });
  const [owned, setOwned] = useState(false);

  const createdGroups = useSelector((state) => state.groups.createdGroups);
  const joinedGroups = useSelector((state) => state.groups.joinedGroups);
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
      <Box px={2}>
        <Grid container alignItems="center" columnSpacing={4}>
          <Grid item>
            <Typography variant="h4">Gruppi creati</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => handleCreateGroup()}>
              Crea nuovo gruppo
            </Button>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} my={3}>
          {loading
            ? Array(3)
                .fill(0)
                .map((i, index) => <GroupItem key={index} group={false} />)
            : createdGroups.map((createdGroup, index) => (
                <GroupItem
                  key={index}
                  owned
                  group={createdGroup}
                  onDelete={handleShowConfirmDialog}
                  onShowMembers={handleShowMembersDialog}
                  onEdit={handleEditGroup}
                  onShowNotes={() => {}}
                />
              ))}
        </Stack>
        <Divider />
        <Grid item xs={12} mt={2}>
          <Typography variant="h4">Altri gruppi</Typography>
          <Stack direction="row" spacing={2} my={3}>
            {loading
              ? Array(3)
                  .fill(0)
                  .map((i, index) => <GroupItem key={index} group={false} />)
              : joinedGroups.map((joinedGroup, index) => (
                  <GroupItem
                    key={index}
                    group={joinedGroup}
                    onShowMembers={handleShowMembersDialog}
                    onDelete={handleShowConfirmDialog}
                    onShowNotes={() => {}}
                  />
                ))}
          </Stack>
        </Grid>
      </Box>
    </PageWrapper>
  );
};

export default GroupsPage;
