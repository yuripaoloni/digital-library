import React, { useState } from "react";
import { Divider, Grid, Typography, Button } from "@mui/material";
import PageWrapper from "components/PageWrapper";
import GroupModal from "components/GroupModal";
import { useSelector } from "react-redux";

const GroupsPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);

  const createdGroups = useSelector((state) => state.groups.createdGroups);
  const joinedGroups = useSelector((state) => state.groups.joinedGroups);

  return (
    <PageWrapper reducer="groups">
      <GroupModal
        show={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      />
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
      <Divider />
      <Grid item xs={12}>
        <Typography variant="h4">Gruppi aggiunti</Typography>
      </Grid>
    </PageWrapper>
  );
};

export default GroupsPage;
