import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import { FaArrowUp } from "react-icons/fa";

const Layout = () => {
  const [showFooter, setShowFooter] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

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
