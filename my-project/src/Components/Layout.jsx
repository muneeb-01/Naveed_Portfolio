import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { FaArrowUp } from "react-icons/fa";
import Reveal from "./Reveal";
import { apiClient } from "../lib/api-client";
import { GET_LATEST_PROJECTS } from "../utils/constants";
import { useAppStore } from "../Store/index";
import { setWithExpiry, getWithExpiry } from "../utils/storage";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Banner from "./Banner";

const Layout = () => {
  const Location = useLocation();
  const { latestProjects, setLatestProjects } = useAppStore();
  const [loading, setIsloading] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const hasLoadedBefore = getWithExpiry("hasloaded");
  const [isRevealLoading, setIsRevealLoading] = useState(!hasLoadedBefore);

  useEffect(() => {
    let timer;
    let isMounted = true;
    const fetchLatestProjects = async () => {
      try {
        setIsloading(true);
        const response = await apiClient.get(GET_LATEST_PROJECTS, {
          withCredentials: true,
        });
        if (response.status === 200 && isMounted) {
          setLatestProjects(response.data.projects);
        }
      } catch {
        toast.error("Internal Server Error!");
      } finally {
        if (isMounted) setIsloading(false);
      }
    };

    if (latestProjects.length === 0) {
      fetchLatestProjects();
    }

    if (hasLoadedBefore) {
      setShowFooter(true);
    } else {
      timer = setTimeout(() => {
        if (!isMounted) return;
        setShowFooter(true);
        setIsRevealLoading(false);
        setWithExpiry("hasloaded", true);
      }, 10000);
    }

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (isRevealLoading) return <Reveal />;
  if (loading || latestProjects.length === 0) return <Loader />;
  return (
    <main className="relative">
      <Link
        to={location.pathname === "/project" ? "/" : "/project"}
        className="bg-[var(--textdark)] group py-4 px-4 rounded-full bg-blend-difference fixed bottom-10 right-10 z-[100]"
      >
        <FaArrowUp className="group-hover:-rotate-45 transition-all duration-75" />
      </Link>
      <Outlet />
      {showFooter && (
        <>
          <Banner />
          <Footer />
        </>
      )}
    </main>
  );
};

export default Layout;
