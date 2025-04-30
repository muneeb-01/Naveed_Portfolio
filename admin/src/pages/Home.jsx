import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsCalendarCheck,
  BsPeopleFill,
  BsCurrencyDollar,
  BsSearch,
  BsFilter,
  BsChevronRight,
} from "react-icons/bs";

const DashboardMain = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const data = [
    {
      icon: <BsCalendarCheck className="lg:size-6 xl:size-10" />,
      value: "1020",
      label: "New Order",
    },
    {
      icon: <BsPeopleFill className="lg:size-6 xl:size-10" />,
      value: "2834",
      label: "Visitors",
    },
    {
      icon: <BsCurrencyDollar className="lg:size-6 xl:size-10" />,
      value: "$2543",
      label: "Total Sales",
    },
  ];

  // Render breadcrumb links
  const renderBreadcrumb = () => (
    <ul className="breadcrumb">
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 && <BsChevronRight />}
          <li>
            <Link
              to={`/${pathSegments.slice(0, index + 1).join("/")}`}
              className={index === pathSegments.length - 1 ? "active" : ""}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  // Render box info
  const renderBoxInfo = () => (
    <ul className="box-info">
      {data.map(({ icon, value, label }, index) => (
        <li key={index}>
          {icon}
          <span className="text">
            <h3>{value}</h3>
            <p>{label}</p>
          </span>
        </li>
      ))}
    </ul>
  );

  // Render orders table
  const renderOrdersTable = () => (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Recent Orders</h3>
          <BsSearch />
          <BsFilter />
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Date Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td>
                  <img src="/img/people.png" alt="user" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td>
                  <span
                    className={`status ${
                      i % 3 === 0
                        ? "completed"
                        : i % 3 === 1
                        ? "pending"
                        : "process"
                    }`}
                  >
                    {i % 3 === 0
                      ? "Completed"
                      : i % 3 === 1
                      ? "Pending"
                      : "Process"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          {renderBreadcrumb()}
        </div>
      </div>

      {renderBoxInfo()}
      {renderOrdersTable()}
    </main>
  );
};

export default DashboardMain;
