import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { useAppStore } from "../Store/index";
import { apiClient } from "../lib/api-client";
import { GET_PROJECTS } from "../utils/constants";

const ProjectGrid = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const { projects, setProjects } = useAppStore();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (projects.length === 0) {
      get_projects();
    }
  }, [projects]);

  const get_projects = async (page = 1) => {
    try {
      const response = await apiClient(
        `${GET_PROJECTS}?page=${page}&limit=${10}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProjects(response.data.projects);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      }
    } catch (error) {}
  };

  const splitProjects = [[], [], [], []]; // 2D array with 4 sub-arrays

  projects.forEach((project, index) => {
    const arrayIndex = index % 4; // This ensures that the projects cycle through the 4 sub-arrays
    splitProjects[arrayIndex].push(project); // Push the project to the correct sub-array
  });

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            {pathSegments.map((segment, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <li>
                    <BsChevronRight />
                  </li>
                )}
                <li key={index}>
                  <Link
                    className={
                      index === pathSegments.length - 1 ? "active" : ""
                    }
                    to={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  >
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.length === 0 ? (
          <h1 className="absolute top-full text-nowrap left-1/2">
            No Projects Uploaded
          </h1>
        ) : (
          <>
            {/* Grid 1 */}
            <div className="grid gap-4">
              {splitProjects[0].map((project) => (
                <Card key={project._id} project={project} />
              ))}
            </div>

            {/* Grid 2 */}
            <div className="grid gap-4">
              {splitProjects[1].map((project) => (
                <Card key={project._id} project={project} />
              ))}
            </div>

            {/* Grid 3 */}
            <div className="grid gap-4">
              {splitProjects[2].map((project) => (
                <Card key={project._id} project={project} />
              ))}
            </div>

            {/* Grid 4 */}
            <div className="grid gap-4">
              {splitProjects[3].map((project) => (
                <Card key={project._id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

const Card = ({ project }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const route = project._id;
    navigate(`/dashboard/handle-single-project/${route}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="w-full flex flex-col justify-center items-start gap-4 overflow-hidden rounded-sm p-14"
    >
      <img
        loading="lazy"
        onClick={handleNavigate}
        src={project.mainImage}
        alt={project.title}
        className="w-full aspect-auto object-cover  object-center"
      />
    </div>
  );
};

export default ProjectGrid;
