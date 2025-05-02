import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import { FaArrowUp } from "react-icons/fa";
import { useAppStore } from "../Store/index";
import Reveal from "./Reveal";

const Layout = () => {
  const [showFooter, setShowFooter] = useState(false);
  const { isRevealLoading, SetIsRevealLoading } = useAppStore();
  const hasloaded = localStorage.getItem("hasLoaded");
  useEffect(() => {
    if (hasloaded) {
      SetIsRevealLoading(false);
    } else {
      const timer = setTimeout(() => {
        setShowFooter(true);
        SetIsRevealLoading(false);
        localStorage.setItem("hasLoaded", true);
      }, 10000);
    }

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  const localStorageLoading = localStorage.getItem("isLoading");
  if (!localStorageLoading && isRevealLoading) return <Reveal />;

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
