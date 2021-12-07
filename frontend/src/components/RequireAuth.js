import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
