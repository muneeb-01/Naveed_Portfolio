import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { RiTeamLine } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { FaSmile } from "react-icons/fa";
import { useAppStore } from "../Store/index";
import { apiClient } from "../lib/api-client";
import { ADMIN_LOGOUT_ROUTE } from "../utils/constants";
import { toast } from "react-toastify";
const Sidebar = () => {
  const { isSidebarHidden, setUserInfo } = useAppStore();

  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { icon: <MdDashboard />, text: "Dashboard", path: "/dashboard/home" },
    {
      icon: <AiOutlineAppstoreAdd />,
      text: "My Store",
      path: "/dashboard/store",
    },
    {
      icon: <IoAnalyticsOutline />,
      text: "Add Project",
      path: "/dashboard/addproject",
    },
    { icon: <FaRegMessage />, text: "Message", path: "/messages" },
    { icon: <RiTeamLine />, text: "Team", path: "/team" },
  ];

  const settingsItems = [
    // { icon: <IoIosSettings />, text: "Settings", path: "/settings" },
    {
      icon: <LuLogOut />,
      text: "Logout",
      path: "/logout",
      className: "logout",
    },
  ];

  const handleLogout = async () => {
    try {
      const responce = await apiClient.get(ADMIN_LOGOUT_ROUTE, {
        withCredentials: true,
      });
      if (responce.status === 200) {
        setUserInfo(null);
      }
    } catch (error) {
      setUserInfo(null);
    }
  };

  return (
    <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
      <Link
        to="/"
        className={`brand w-full flex justify-center items-center  ${
          !isSidebarHidden && "gap-3"
        }`}
      >
        <FaSmile />
        <span className="text">{!isSidebarHidden && "Adminhub"}</span>
      </Link>

      <ul className="side-menu top">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`${activeIndex === index ? "active" : ""}`}
          >
            <Link
              id="a"
              to={item.path}
              className={`flex pl-4 justify-start ${
                !isSidebarHidden && "gap-2"
              } items-center`}
              onClick={() => setActiveIndex(index)}
            >
              {item.icon}
              <span id="navigate-text" className="text">
                {!isSidebarHidden && item.text}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="side-menu">
        {settingsItems.map((item, index) => (
          <li key={index}>
            <Link
              id="a"
              to={item.path}
              className={`flex pl-4 justify-start items-center ${
                !isSidebarHidden && "gap-2"
              } ${item.className || ""}`}
              onClick={handleLogout}
            >
              {item.icon}
              <span className="text">{!isSidebarHidden && item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
