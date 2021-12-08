import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as booksSlice from "states/booksSlice";
import * as authSlice from "states/authSlice";

const PageWrapper = ({ auth, children }) => {
  const { error, variant, message } = useSelector((state) =>
    auth ? state.auth.error : state.books.error
  );

  const dispatch = useDispatch();

  const onClose = () =>
    dispatch(auth ? authSlice.unsetError() : booksSlice.unsetError());

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
