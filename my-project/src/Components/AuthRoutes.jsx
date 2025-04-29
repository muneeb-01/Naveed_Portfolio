import React from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../Store"; // adjust the import path as needed

export const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = Boolean(userInfo);

  return isAuthenticated ? <Navigate to="/admin/profile" replace /> : children;
};

export const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = Boolean(userInfo);

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};
