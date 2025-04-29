import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiClient } from "../../lib/api-client";
import { GET_PROJECTS } from "../../utils/constants";
import { useAppStore } from "../../Store";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Cards from "./Cards"; // Assuming Cards is another component for the project list

const Project = () => {
  const {
    projects,
    setProjects,
    totalPages,
    setTotalPages,
    currentPage,
    setCurrentPage,
  } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    document.body.setAttribute("theme", "white");
  }, []);

  // Fetch projects when page changes
  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects(currentPage);
    }
  }, [projects, currentPage]);

  const fetchProjects = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(
        `${GET_PROJECTS}?page=${page}&limit=8`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { projects, totalPages, currentPage } = response.data;
        setProjects(projects);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
        setHasError(false);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth", // This will smoothly scroll to the top
      });

      setCurrentPage(page);
      fetchProjects(page);
    }
  };

  if (hasError) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load projects. Please try again later.
      </div>
    );
  }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="text-[#18181B] w-full"
    >
      <header className="w-full pt-10 sm:pt-16">
        <h1 className="no-select opacity-95 drop-shadow-xl uppercase w-full text-center font-extrabold tracking-tighter text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[16rem] leading-none">
          Projects
        </h1>
      </header>
      {!isLoading && (
        <section className="w-full px-4 sm:px-8">
          <Cards />
        </section>
      )}

      {/* Pagination */}
      <section className="pt-20">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </motion.div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const maxButtons = 5; // Number of visible page buttons
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 py-10 text-base select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-40"
      >
        <FaChevronLeft />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-10 h-10 rounded-full border text-sm sm:text-base ${
            number === currentPage ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-40"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Project;
