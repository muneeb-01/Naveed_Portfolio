import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "../../Store/index";

// Memoized Card component
const Card = React.memo(({ imgUrl, title, id }) => {
  const navigate = useNavigate();

  // Memoize navigation handler
  const handleNavigate = useCallback(() => {
    navigate(`/project/${id}`);
  }, [navigate, id]);

  return (
    <motion.div
      onClick={handleNavigate}
      className="mb-4 break-inside-avoid cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={imgUrl}
        alt={title}
        className="w-full rounded-lg shadow-md"
        loading="lazy"
      />
      <h3 className="mt-2 font-semibold text-lg">{title}</h3>
    </motion.div>
  );
});

const MasonryLayout = () => {
  const { projects } = useAppStore();

  if (!projects?.length) {
    return <p className="text-center">No Projects to show.</p>;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
      {projects.map((project) => (
        <Card
          key={project._id}
          id={project._id}
          imgUrl={project.mainImage}
          title={project.title}
        />
      ))}
    </div>
  );
};

export default MasonryLayout;
