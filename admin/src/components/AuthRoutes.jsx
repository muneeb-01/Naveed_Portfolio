import { useAppStore } from "../Store/index";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthRoute = !!userInfo;
  return isAuthRoute ? <Navigate to="/dashboard/home" /> : children;
};

export const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthRoute = !!userInfo;
  return isAuthRoute ? children : <Navigate to="/signin" />;
};
