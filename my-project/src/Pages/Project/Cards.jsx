import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "../../Store/index";

const Card = ({ imgUrl, title, index }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/project/${index}`);
  };

  return (
    <motion.div
      onClick={handleNavigate}
      className="mb-4 break-inside-avoid cursor-pointer group"
    >
      <img
        src={imgUrl}
        alt={title}
        className="w-full rounded-lg shadow-md transition-transform duration-300"
        loading="lazy"
      />
      <h3 className="mt-2 font-semibold text-lg">{title}</h3>
    </motion.div>
  );
};

const MasonryLayout = () => {
  const { projects } = useAppStore();

  if (!projects || projects.length === 0) {
    return <p className="text-center">No Projects to show.</p>;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
      {projects.map((project) => (
        <Card
          key={project._id}
          index={project._id}
          imgUrl={project.mainImage}
          title={project.title}
        />
      ))}
    </div>
  );
};

export default MasonryLayout;
