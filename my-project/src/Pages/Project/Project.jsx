import React, { useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { apiClient } from "../../lib/api-client";
import { GET_PROJECTS } from "../../utils/constants";
import { useAppStore } from "../../Store";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MasonryLayout from "./Cards";

// Memoized Pagination component
const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const maxButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  // Memoize pages array
  const pages = useMemo(
    () =>
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    [startPage, endPage]
  );

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 py-10 text-base select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-40"
        aria-label="Previous page"
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
          aria-label={`Page ${number}`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-40"
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
});

const Project = () => {
  const {
    projects,
    setProjects,
    totalPages,
    setTotalPages,
    currentPage,
    setCurrentPage,
  } = useAppStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // Set theme once on mount
  useEffect(() => {
    document.body.setAttribute("theme", "white");
  }, []);

  // Fetch projects with memoized callback
  const fetchProjects = useCallback(
    async (page = 1) => {
      try {
        setIsLoading(true);
        const { status, data } = await apiClient.get(
          `${GET_PROJECTS}?page=${page}&limit=30`,
          { withCredentials: true }
        );

        if (status === 200) {
          setProjects(data.projects);
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
          setHasError(false);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [setProjects, setTotalPages, setCurrentPage]
  );

  // Fetch projects on mount or page change
  useEffect(() => {
    if (!projects.length) {
      fetchProjects(currentPage);
    }
  }, [projects.length, currentPage, fetchProjects]);

  // Memoized page change handler
  const handlePageChange = useCallback(
    (page) => {
      if (page > 0 && page <= totalPages) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrentPage(page);
      }
    },
    [totalPages, setCurrentPage]
  );

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
      <header className="w-full p-16">
        <h1 className="no-select opacity-95 drop-shadow-xl uppercase text-center font-extrabold tracking-tighter text-[clamp(3rem,10vw,16rem)] leading-none">
          Projects
        </h1>
      </header>
      {!isLoading && (
        <section className="w-full px-4 sm:px-8">
          <MasonryLayout />
        </section>
      )}
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

export default Project;
