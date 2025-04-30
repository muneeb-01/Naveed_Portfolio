import { useAppStore } from "../Store/index";
import { Navigate } from "react-router-dom";

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null; // Return null if the cookie is not found
};

export const AuthRoute = ({ children }) => {
  const jwt = getCookie("jwt");
  const { userInfo } = useAppStore();
  const isAuthRoute = !!userInfo || !!jwt;
  return isAuthRoute ? <Navigate to="/dashboard/home" /> : children;
};

export const PrivateRoute = ({ children }) => {
  const jwt = getCookie("jwt");
  const { userInfo } = useAppStore();
  const isAuthRoute = !!userInfo || !!jwt;
  return isAuthRoute ? children : <Navigate to="/signin" />;
};
