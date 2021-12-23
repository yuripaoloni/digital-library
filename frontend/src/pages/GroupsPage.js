import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography, Button, Stack, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { onDeleteGroup, onFetchGroups, selectGroup } from "states/groupsSlice";
import PageWrapper from "components/PageWrapper";
import GroupModal from "components/GroupModal";
import GroupItem from "components/GroupItem";
import GroupMembersDialog from "components/GroupMembersDialog";

const GroupsPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showMembersDialog, setShowMembersDialog] = useState(false);

  const createdGroups = useSelector((state) => state.groups.createdGroups);
  const joinedGroups = useSelector((state) => state.groups.joinedGroups);
  const loading = useSelector((state) => state.groups.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onFetchGroups());
  }, [dispatch]);

  const handleShowConfirmDialog = (book) => {
    dispatch(selectGroup(book));
    setShowConfirmDialog(true);
  };

  const handleShowMembersDialog = (book) => {
    dispatch(selectGroup(book));
    setShowMembersDialog(true);
  };

  const handleDeleteGroup = () => {
    dispatch(onDeleteGroup());
    setShowConfirmDialog(false);
  };

  return (
    <PageWrapper
      reducer="groups"
      showDialog={showConfirmDialog}
      dialogTitle="Elimina gruppo"
      dialogDescription="Procedere con l'eliminazione del gruppo ?"
      dialogOnCancel={() => setShowConfirmDialog(false)}
      dialogOnConfirm={() => handleDeleteGroup()}
    >
      <GroupModal
        show={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      />
      <GroupMembersDialog
        showDialog={showMembersDialog}
        onClose={() => setShowMembersDialog(false)}
      />
      <Box px={2}>
        <Grid container alignItems="center" columnSpacing={4}>
          <Grid item>
            <Typography variant="h4">Gruppi creati</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setShowGroupModal(true)}>
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
                  onEdit={() => {}}
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
