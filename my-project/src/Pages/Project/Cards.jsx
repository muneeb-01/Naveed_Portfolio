import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../Store";
gsap.registerPlugin(ScrollTrigger);

const Card = ({ imgUrl, title, index }) => {
  const cardRef = useRef();
  const navigate = useNavigate();

  // Use the useEffect hook efficiently by cleaning up on unmount
  useEffect(() => {
    const element = cardRef.current;

    // Create a GSAP timeline for scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        end: "bottom -30%",
        scrub: true,
        onEnter: () => handleCardEnter(element),
        onLeaveBack: () => handleCardLeave(element),
      },
    });

    return () => {
      tl.kill(); // Clean up the timeline on component unmount
    };
  }, []);

  // Animation functions for entering and leaving the view
  const handleCardEnter = (element) => {
    gsap.to(".card", {
      scale: 1,
      duration: 0.5,
      ease: "expoScale(0.1,7,none)",
    });
    gsap.to(element.children[0], { scale: 1.2, duration: 0.5 });
    gsap.to(".cart-text", { scale: 0.75, opacity: 0, translateY: -50 });
    gsap.to(element.children[1], { scale: 1.2, opacity: 1, translateY: -50 });
  };

  const handleCardLeave = (element) => {
    gsap.to(".card", {
      scale: 1,
      duration: 0.5,
      ease: "expoScale(0.5,7,none)",
    });
    gsap.to(element.children[0], { scale: 1.2, duration: 0.5 });
    gsap.to(".cart-text", { scale: 0.75, opacity: 0, translateY: -50 });
    gsap.to(element.children[1], { scale: 1.2, opacity: 1, translateY: -50 });
  };

  const handleNavigate = () => {
    navigate(`/project/${index}`);
  };

  return (
    <div
      ref={cardRef}
      className="relative w-[90vw] h-[30vh] lg:h-[55vh] flex justify-center items-center"
    >
      <motion.img
        onClick={handleNavigate}
        loading="lazy"
        src={imgUrl}
        className={`card rounded-md object-contain object-center ml-[5vh] w-[60%] h-full ${
          index === 0 ? "scale-[1.2]" : ""
        }`}
        alt={title}
      />
      <h1 className="cart-text absolute left-4 sm:left-10 opacity-0 scale-75 text-2xl sm:text-4xl md:text-5xl w-2/3 sm:w-1/2 md:w-1/3 text-wrap font-signature font-semibold">
        {title}
      </h1>
    </div>
  );
};

const CardList = () => {
  const { projects } = useAppStore();

  // Early return if there are no projects
  if (projects.length === 0) {
    return <p className="text-center">No Projects to show.</p>;
  }

  return (
    <div
      id="project-container"
      className="w-full relative flex flex-col justify-center items-center gap-1 sm:gap-[3vh] md:gap-[7vh] gap-[13vh] py-[13vh]"
    >
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

export default CardList;
