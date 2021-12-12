import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center" mb={1}>
          404
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" textAlign="center" mb={5}>
          La pagina ricercata non esiste
        </Typography>
      </Grid>

      <Button variant="outlined" LinkComponent={Link} to="/">
        Torna alla home page
      </Button>
    </Grid>
  );
};

export default NoMatch;
