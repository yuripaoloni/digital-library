import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
const Footer = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        backgroundColor: "#222C4A",
        padding: "30px 0 30px 0",
      }}
    >
      <Grid
        data-testid="footer"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{ color: "white" }}
          variant="body1"
          data-testid="footer-signature"
        >
          © 2021 Digital Library
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
