// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Layout } from "./layout/layout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Store from "./pages/Strore";
import "./index.css";
import Addproject from "./pages/Addproject";
import { useAppStore } from "./Store/index";
import SingleProjectHandler from "./pages/SingleProjectHandler";
import { Navigate } from "react-router-dom";
import { AuthRoute, PrivateRoute, getCookie } from "./components/AuthRoutes";
import { apiClient } from "./lib/api-client";
import { GET_ADMIN_INFO_ROUTE } from "./utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { setSidebarHidden } = useAppStore();
  const { setUserInfo, userInfo } = useAppStore();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setSidebarHidden(true);
      } else {
        setSidebarHidden(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const getUserInfo = async () => {
      try {
        const responce = await apiClient.get(GET_ADMIN_INFO_ROUTE, {
          withCredentials: true,
        });
        if (responce.status === 200) {
          setUserInfo(responce.data.user);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    const jwt = getCookie("jwt");
    if (!userInfo) {
      getUserInfo();
    } else {
      setIsLoading(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSidebarHidden, userInfo]);
  if (isLoading) return <>Loading...</>;
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes - No Header/Sidebar */}
        <Route
          path="/signin"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />

        {/* Protected Routes - With Header/Sidebar */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* <Route
              path="home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            /> */}
            <Route
              path="store"
              element={
                <PrivateRoute>
                  <Store />
                </PrivateRoute>
              }
            />
            <Route
              path="addproject"
              element={
                <PrivateRoute>
                  <Addproject />
                </PrivateRoute>
              }
            />
            <Route
              path="handle-single-project/:id"
              element={
                <PrivateRoute>
                  <SingleProjectHandler />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard/store" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
