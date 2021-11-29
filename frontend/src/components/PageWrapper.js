import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { unsetError } from "states/booksSlice";

const PageWrapper = ({ children }) => {
  const { error, variant, message } = useSelector((state) => state.books.error);

  const dispatch = useDispatch();

  const onClose = () => dispatch(unsetError());

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error}
        autoHideDuration={6000}
        onClose={() => onClose()}
      >
        <Alert
          onClose={() => onClose()}
          severity={variant}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};

export default PageWrapper;
