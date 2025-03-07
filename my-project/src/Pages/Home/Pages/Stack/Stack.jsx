import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import {HOST} from "../../../../utils/constants"; 
gsap.registerPlugin(ScrollTrigger);

const Stack = ({projects}) => {
  const stackSection = useRef(null);
  console.log(projects)
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackSection.current,
        start: "top top",
        end: "start 0%",
        scrub: true,
        onEnter: () => {
          document.body.setAttribute("theme", "white");
        },
        onEnterBack: () => {
          document.body.setAttribute("theme", "salmon");
        },
      },
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);
  return (
    <div
      ref={stackSection}
      className="section border-t-4 border-[#fff] pt-[15vh]"
    >
      <Header />
      <div className="w-full relative">
        {projects.map((project, index)=><StackContainer key={index} project={project}/>)}
      </div>
    </div>
  );
};

export default Stack;

const StackContainer = ({ project }) => {
  const textRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    navigate(`/project/${project._id}`);
  };
  return (
    <div className="stack drop-shadow-xl">
      <div
        className={`w-[87%] h-[82%] relative flex justify-center overflow-hidden items-end rounded-[20px]`}
      >
        <img
          src={`${HOST+project.imagesUrl[0]}`}
          className="absolute -z-10 w-full h-full bg-cover bg-center"
          alt="Image"
        />
        <div className="w-full flex ">
          <div className="w-3/4  2xl:pl-20 xl:pl-12 flex items-center">
            <h1
              ref={textRef}
              className="2xl:text-[7rem] xl:text-[5rem] 2xl:pb-10 xl:pb-0 font-poppins tracking-tight uppercase text-white"
            >
              {project.title.slice(0,10) + "..."}
            </h1>
          </div>
          <div
            onClick={handleNavigate}
            className="w-1/2 flex justify-end items-center 2xl:pr-20 xl:pr-10"
          >
            <div className="rounded-full bg-white 2xl:size-[10rem] xl:size-[6rem]  opacity-85"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className=" text-center py-[6vh] flex flex-col justify-center items-center xl:gap-[4.5vh]">
      <h1 className="fs2-horizontal uppercase font-Gilgan  tracking-tight font-medium ">
        WORKS
      </h1>
      <p className="2xl:text-2xl xl:text-lg xl:leading-[1.2rem] w-[35%] font-poppins tracking-tight">
        Elevate your space with our top picks. Handpicked for their timeless
        design and quality, these pieces will bring character and charm to any
        room.
      </p>
    </div>
  );
};
