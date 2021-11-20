import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          mt: "auto",
        }}
      >
        <AppBar
          position="static"
          style={{ background: "#222C4A" }}
          data-testid="footer"
        >
          <Container maxWidth="md" style={{}}>
            <Toolbar>
              <Typography
                variant="body1"
                color="inherit"
                data-testid="footer-signature"
              >
                © 2021 Digital Library
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Footer;
