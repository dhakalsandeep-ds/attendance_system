import React from "react";
import { useAuth } from "../context/auth";
import { Navigate, Outlet } from "react-router-dom";

const HideRoute = ({ children }) => {
  const user = useAuth();
  console.log(user.token());
  if (user.token()) {
    return <Navigate to="/admin/batch" replace={true}></Navigate>;
  }

  return children;
};

export default HideRoute;
