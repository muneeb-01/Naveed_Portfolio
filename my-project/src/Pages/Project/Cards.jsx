import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../Store";
import {HOST} from "../../utils/constants"; 
gsap.registerPlugin(ScrollTrigger);


const Card = ({ imgUrl, title, index }) => {
  const cardRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const element = cardRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 50%",
        end: "bottom -50%",
        scrub: 2,
        onEnter: () => {
          gsap.to(".card", {
            scale: 1,
            duration: 0.5,
            ease: "expoScale(0.1,7,none)",
          });
          gsap.to(element.children[0], { scale: 1.2, duration: 0.5 });
          gsap.to(".cart-text", {
            scale: 0.75,
            opacity: 0,
            translateY: -50,
          });
          gsap.to(element.children[1], {
            scale: 1.2,
            opacity: 1,
            translateY: -50,
          });
        },
        onLeaveBack: () => {
          gsap.to(".card", {
            scale: 1,
            duration: 0.5,
            ease: "expoScale(0.5,7,none)",
          });
          gsap.to(element.children[0], { scale: 1.2, duration: 0.5 });
          gsap.to(".cart-text", {
            scale: 0.75,
            opacity: 0,
            translateY: -50,
          });
          gsap.to(element.children[1], {
            scale: 1.2,
            opacity: 1,
            translateY: -50,
          });
        },
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleNavigate = (e) => {
    const route = index;
    navigate(`/project/${route}`);
  };

  return (
    <div
      ref={cardRef}
      className="relative w-[90vw] h-[55vh] flex justify-center items-center"
    >
      <motion.img
        onClick={handleNavigate}
        loading="lazy"
        src={`${imgUrl}`}
        className={`card rounded-md ml-[5vh] w-[60%] h-full ${
          index === 0 && "scale-[1.2]"
        }`}
        alt=""
      />
      <h1
        className={`cart-text absolute left-10 scale-75  opacity-0  text-5xl w-1/3 text-wrap font-signature font-semibold`}
      >
        {title}
      </h1>
    </div>
  );
};

const CardList = () => {
  const {projects} = useAppStore();
  return (
    <div
      id="project-container"
      className="w-full relative flex flex-col justify-center items-center gap-[13vh] py-[13vh] "
    >
      {projects.map((project,idx) => (
        <Card
          key={idx}
          index={project._id}
          imgUrl={project.imagesUrl[0].fileUrls[0]}
          title={project.title}
        />
      ))}
    </div>
  );
};
export default CardList;

// const images = [
//   {
//     imgUrl: "/images/ext_1.webp",
//     title: "Urban Oasis",
//   },
//   {
//     imgUrl: "/images/ext_2.jpg",
//     title: "Beyond the Façade",
//   },
//   {
//     imgUrl: "/images/ext_3.jpg",
//     title: "Future-focused Exterior Designs",
//   },
//   {
//     imgUrl: "/images/ext_4.jpg",
//     title: "Geometric Harmony",
//   },
//   {
//     imgUrl: "/images/ext_1.webp",
//     title: "Sculpting Light",
//   },
//   {
//     imgUrl: "/images/ext_2.jpg",
//     title: "Blurring Boundaries",
//   },
//   {
//     imgUrl: "/images/ext_3.jpg",
//     title: "Urban Oasis",
//   },
//   {
//     imgUrl: "/images/ext_4.jpg",
//     title: "Modern Façade",
//   },
// ];
