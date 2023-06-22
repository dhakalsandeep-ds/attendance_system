import React from "react";
import { useAuth } from "../context/auth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const validateToken = async (token) => {
  let bodyContent = JSON.stringify({
    token,
  });
  let headersList = {
    "Content-Type": "application/json",
  };
  let response = await fetch("http://localhost:8000/admin/validate", {
    body: bodyContent,
    headers: headersList,
  });

  let ans = await response.json();
  return ans.success;
};

const ProtectedRoute = ({ children }) => {
  const user = useAuth();
  // const token = user.token();

  // const isTokenValid = validateToken(token);

  // if (isTokenValid) {
  //   return children;
  // }

  // return <Navigate to="/"></Navigate>;

  if (user.token()) {
    console.log(children);
    return <Outlet></Outlet>;
  }

  return <Navigate to="/admin" replace={true}></Navigate>;
};

export default ProtectedRoute;
