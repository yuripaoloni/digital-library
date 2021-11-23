import React from "react";
import { Snackbar, Alert } from "@mui/material";

const PageWrapper = ({ alert, alertMessage, onClose, children }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert.length > 0 ? true : false}
        autoHideDuration={6000}
        onClose={() => onClose()}
      >
        <Alert
          onClose={() => onClose()}
          severity={alert.length === 0 ? "error" : alert}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};

export default PageWrapper;
