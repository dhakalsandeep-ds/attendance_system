import React from "react";
import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

const HideRoute = ({ children }) => {
  const user = useAuth();
  console.log(user.token());
  if (user.token()) {
    return <Navigate to="/batch"></Navigate>;
  }

  return children;
};

export default HideRoute;
