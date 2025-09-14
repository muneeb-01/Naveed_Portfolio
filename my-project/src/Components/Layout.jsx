import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { apiClient } from "../lib/api-client";
import {
  GET_LATEST_PROJECTS,
  GET_ALL_PROJECTS,
  GET_PROJECT_BY_ID_FOR_UI,
} from "../utils/constants";
import { useAppStore } from "../Store/index";
import { setWithExpiry, getWithExpiry } from "../utils/storage";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Reveal from "./Reveal";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

const Layout = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const {
    latestProjects,
    setLatestProjects,
    projects,
    setProjects,
    setSingleProject,
    prevId,
    setprevId,
  } = useAppStore();

  const [appState, setAppState] = useState({
    isLoading: false,
    showContent: !!getWithExpiry("hasloaded"),
  });
  const [isMenu, setIsMenu] = useState(false);

  const fetchLatestProjects = useCallback(async () => {
    try {
      setAppState((prev) => ({ ...prev, isLoading: true }));
      const { status, data } = await apiClient.get(GET_LATEST_PROJECTS, {
        withCredentials: true,
      });
      if (status === 200) {
        setLatestProjects(data.projects);
      }
    } catch {
      toast.error("Internal Server Error!");
    } finally {
      setAppState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [setLatestProjects]);

  const getAllProjects = useCallback(async () => {
    try {
      setAppState((prev) => ({ ...prev, isLoading: true }));
      const { status, data } = await apiClient.get(GET_ALL_PROJECTS);
      if (status === 200) {
        setProjects(data.projects);
      }
    } catch {
      toast.error("Internal Server Error!");
    } finally {
      setAppState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [setProjects]);

  const getProjectById = useCallback(
    async (projectId) => {
      try {
        setAppState((prev) => ({ ...prev, isLoading: true }));
        const { status, data } = await apiClient.get(
          `${GET_PROJECT_BY_ID_FOR_UI}${projectId}`,
          { withCredentials: true }
        );
        if (status === 200) {
          setSingleProject(data.project);
          setprevId(projectId);
        }
      } catch {
        toast.error("Internal Server Error!");
      } finally {
        setAppState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [setSingleProject, setprevId]
  );

  useEffect(() => {
    let isMounted = true;
    let timer;

    if (!appState.showContent) {
      timer = setTimeout(() => {
        if (!isMounted) return;
        setAppState((prev) => ({ ...prev, showContent: true }));
        setWithExpiry("hasloaded", true);
      }, 10000);
    }

    if (pathname === "/" && !latestProjects.length) {
      fetchLatestProjects();
    } else if (pathname === "/project" && !projects.length) {
      getAllProjects();
    } else if (id && id !== prevId) {
      getProjectById(id);
    }

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
      toast.dismiss();
    };
  }, [
    pathname,
    id,
    prevId,
    latestProjects.length,
    projects.length,
    appState.showContent,
    fetchLatestProjects,
    getAllProjects,
    getProjectById,
  ]);

  if (!appState.showContent && appState.isLoading) return <Reveal />;
  if (appState.isLoading) return <Loader />;

  return (
    <main className="relative">
      <Navbar isMenu={isMenu} setIsMenu={setIsMenu} />
      {!isMenu && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </motion.div>
      )}
      {appState.showContent && !isMenu && (
        <>
          <Banner />
          <Footer />
        </>
      )}
    </main>
  );
};

export default Layout;
