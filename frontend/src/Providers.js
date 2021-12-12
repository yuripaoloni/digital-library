import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "states/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ErrorBoundary } from "react-error-boundary";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Typography } from "@mui/material";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <Typography variant="h4" mb={3}>
        Ooops, qualcosa è andato storto...{" "}
      </Typography>
      <Button
        variant="outlined"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Riprova
      </Button>
    </div>
  );
};

const Providers = ({ children }) => {
  const theme = createTheme({});

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default Providers;
