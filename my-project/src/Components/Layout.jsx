import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import { FaArrowUp } from "react-icons/fa";
import Reveal from "./Reveal";
import { apiClient } from "../lib/api-client";
import { GET_LATEST_PROJECTS } from "../utils/constants";
import { useAppStore } from "../Store/index";

const Layout = () => {
  const { latestProjects, setLatestProjects } = useAppStore();
  const [loading, setIsloading] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isRevealLoading, setIsRevealLoading] = useState(true);
  const hasloaded = localStorage.getItem("hasLoaded");
  useEffect(() => {
    const getLatestProjects = async () => {
      try {
        setIsloading(true);
        const response = await apiClient.get(GET_LATEST_PROJECTS, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setLatestProjects(response.data.projects);
        }
      } catch (error) {
        toast.error("Internal Server error!");
      } finally {
        setIsloading(false);
      }
    };

    if (latestProjects.length === 0) {
      getLatestProjects();
    }
    let timer;
    if (hasloaded) {
      setIsRevealLoading(false);
    } else {
      timer = setTimeout(() => {
        setShowFooter(true);
        setIsRevealLoading(false);
        localStorage.setItem("hasLoaded", true);
      }, 10000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    }; // Cleanup on unmount
  }, []);
  const localStorageLoading = localStorage.getItem("isLoading");
  if (!localStorageLoading && isRevealLoading) return <Reveal />;
  if (loading || latestProjects.length === 0)
    return <p className="text-center py-2">Loading...</p>;

  return (
    <main className="relative">
      <Link
        to={"/project"}
        className="bg-[var(--textdark)] group py-4 px-4 rounded-full bg-blend-difference fixed bottom-10 right-10  z-[100]"
      >
        <FaArrowUp className=" group-hover:-rotate-45 transition-all duration-75" />
      </Link>
      <Outlet />
      {showFooter && <Footer />}
    </main>
  );
};

export default Layout;
