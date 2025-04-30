// src/layout/Layout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <>
      <div className=" overflow-hidden flex justify-center items-center w-full h-screen shadow-lg rounded-lg">
        <div className="flex w-[95vw] h-[92vh] overflow-hidden rounded-xl ">
          <Sidebar />
          <main className="w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
