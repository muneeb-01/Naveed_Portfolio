import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "../../Store/index";
const SingleProject = () => {
  document.body.setAttribute("theme", "white");
  const { singleProject } = useAppStore();

  if (!singleProject)
    return <div className="text-center py-20">Project Not Found</div>;

  const images = singleProject.selectedImages || [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="w-full"
    >
      {singleProject.mainImage && (
        <LandingPage
          title={singleProject.title}
          imageUrl={singleProject.mainImage}
        />
      )}
      <TextContainer
        description={singleProject.description}
        type={singleProject.type}
      />
      <ImageGallery images={images.slice(1)} />
    </motion.div>
  );
};

// Optimized TextContainer with memoization
const TextContainer = React.memo(({ description, type }) => (
  <div className="w-full grid grid-cols-1 md:grid-cols-[65%_35%] text-lg text-slate-600 px-8 md:px-[10rem] py-[5rem] gap-10">
    <div className="font-Gilgan">{description}</div>
    <div className="font-Gilgan text-right">{type}</div>
  </div>
));

// Optimized LandingPage with memoization
const LandingPage = React.memo(({ title, imageUrl }) => (
  <div className="w-full h-screen relative">
    <img
      src={imageUrl}
      className="w-full h-screen object-cover"
      alt="Main"
      loading="lazy"
    />
    <div className="w-full h-screen bg-black/20 absolute top-0 left-0" />
    <h1 className="text-4xl sm:text-6xl md:text-7xl font-signature font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
      {title}
    </h1>
  </div>
));

// Optimized ImageGallery with lazy loading and destructuring
const ImageGallery = React.memo(({ images = [] }) => {
  if (images.length === 0) return null;

  return (
    <div className="w-full px-6 sm:px-16 py-10 space-y-12">
      {images.map((image, index) => {
        const isEven = index % 2 === 0;
        const nextImage = images[index + 1]; // Safe access for next image

        return isEven ? (
          <div key={index} className="w-full flex justify-center">
            <img
              src={image}
              alt={`Project ${index}`}
              className="w-full sm:w-[90%] max-w-5xl rounded-md shadow-md"
              loading="lazy"
            />
          </div>
        ) : nextImage ? (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={image}
              alt={`Project ${index}`}
              className="w-full h-auto rounded-md shadow-md"
              loading="lazy"
            />
            <img
              src={nextImage}
              alt={`Project ${index + 1}`}
              className="w-full h-auto rounded-md shadow-md"
              loading="lazy"
            />
          </div>
        ) : (
          <div key={index} className="w-full flex justify-center">
            <img
              src={image}
              alt={`Project ${index}`}
              className="w-full sm:w-[90%] max-w-5xl rounded-md shadow-md"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
});

export default SingleProject;
