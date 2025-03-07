import React, { Children, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import LandingPage from "./Pages/Home/LandingPage";
import Project from "./Pages/Project/Project";
import SingleProject from "./Pages/SingleProject/SingleProject";
import FormDisplay from "./Pages/form/FormDisplay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiClient } from "./lib/api-client";
import { GET_ADMIN_INFO_ROUTE } from "./utils/constants";
import { useAppStore } from "./Store/index";
import AdminProfile from "./Pages/Profile/AdminProfile";

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthRoute = !!userInfo;
  return isAuthRoute ? <Navigate to="/admin/profile" /> : children;
};

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthRoute = !!userInfo;
  return isAuthRoute ? children : <Navigate to="/admin/login" />;
};

const App = () => {
  const location = useLocation();
  return (
    <div data-scroll-container>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project/:id" element={<SingleProject />} />
          <Route
            path="/admin/login"
            element={
              <AuthRoute>
                <FormDisplay />
              </AuthRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const ScrollToTop = ({ scroll }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.LocomotiveScroll) {
      window.LocomotiveScroll.scrollTo(0);
    }
    return () => {};
  }, [pathname]);

  return null;
};

const RootApp = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });
    window.LocomotiveScroll = scroll;
    const getUserInfo = async () => {
      try {
        const responce = await apiClient.get(GET_ADMIN_INFO_ROUTE, {
          withCredentials: true,
        });
        if (responce.status === 200) {
          setUserInfo(responce.data.admin);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
      } finally {
        setIsLoading(false);
      }
    };
    if (!userInfo) {
      getUserInfo();
    } else {
      setIsLoading(false);
    }
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  if (isLoading) return <>Loading...</>;
  return (
    <BrowserRouter>
      <ToastContainer />
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
};

export default RootApp;
