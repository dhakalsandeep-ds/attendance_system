import React from "react";
import { useAuth } from "../context/auth";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useAuth();
  const navigate = useNavigate();
  console.log(user.token());
  if (user.token()) {
    return children;
  }

  return <Navigate to="/"></Navigate>;
};

export default ProtectedRoute;
