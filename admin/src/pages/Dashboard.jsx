// src/layout/Layout.js
import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <section id="content">
        <Header />
        <Outlet />
      </section>
    </>
  );
};

export default Dashboard;
