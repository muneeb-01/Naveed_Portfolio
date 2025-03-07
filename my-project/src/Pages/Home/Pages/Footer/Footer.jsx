import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed={window.innerWidth > 1284 ? "0.989" : "0"}
      className="w-full bg-[#2B2B2B] text-white min-h-[95vh] mt-[15vh] flex flex-col rounded-tl-[50px] rounded-tr-[50px]"
    >
      <Marquee />
      <Links />
    </div>
  );
};

export default Footer;

const Marquee = () => {
  return (
    <div className="w-full relative py-[2.8vh] md:py-[4vh] xl:py-[7vh]   border-b-4 border-white  ">
      <div className="overflow-hidden tracking-tighter text-lg sm:text-[8.3rem] md:text-[10rem] 2xl:text-[8rem] xl:text-[5rem]  xl:leading-[0.81em] py-[2vh] flex items-center">
        <h1
          className="font-Gilgan font-semibold text-nowrap pl-[4vw] animate-marquee"
        >
          <span className="inline-block xl:size-[4.2rem] 2xl:size-[6rem]  rounded-full mr-[4vw] bg-[#FF8E82]"></span>
          Let's work <span className=" font-Crisp font-thin">together</span>
        </h1>
        <h1
          className="font-Gilgan font-semibold text-nowrap pl-[4vw] animate-marquee"
        >
          <span className="inline-block xl:size-[4.2rem] 2xl:size-[6rem]  rounded-full mr-[4vw] bg-[#FF8E82]"></span>
          Let's work <span className=" font-Crisp font-thin">together</span>
        </h1>
        <h1
          className="font-Gilgan font-semibold text-nowrap pl-[4vw] animate-marquee"
        >
          <span className="inline-block xl:size-[4.2rem] 2xl:size-[6rem]  rounded-full mr-[4vw] bg-[#FF8E82]"></span>
          Let's work <span className=" font-Crisp font-thin">together</span>
        </h1>
      </div>
    </div>
  );
};

const Links = () => {
  return (
    <div className="w-full flex-grow grid grid-cols-[35%_35%_15%_15%] 2xl:p-28 xl:p-[4rem]">
      <div className="">
        <h2 className="font-signature tracking-tight  xl:text-7xl ">
          naveed mughal
        </h2>
        <p className="xl:text-[1rem] 2xl:text-lg font-poppins font-medium tracking-tight mt-4">
          We show the power of{" "}
          <span className="font-Crisp text-[#FF8E82] text-xl">design</span>
        </p>
        <p className="xl:text-[1rem] 2xl:text-lg font-poppins font-medium tracking-tight 2xl:mt-2 xl:mt-1">
          We show the power of{" "}
          <span className="font-Crisp text-[#FF8E82] text-xl">beauty</span>
        </p>
      </div>
      <div className="">
        <p className="font font-poppins mt-[3vh] xl:text-[1rem] 2xl:text-lg text-[#FF8E82]">
          Drop me a line
        </p>
        <div className="mt-[4.9vh]">
          <a
            className="font underline font-poppins text-[1.63rem] font-semibold tracking-tighter"
            href="#"
          >
            hello<span>@</span>naveedmughal.com
          </a>
        </div>
      </div>
      <div className="">
        <p className="font font-poppins mt-[3vh] xl:text-[1rem] 2xl:text-lg text-[#FF8E82]">
          Link
        </p>
        <div className="mt-[4.9vh] flex flex-col">
          <a
            className="font font-poppins xl:text-[1rem] 2xl:text-lg tracking-tighter"
            href="#"
          >
            Portfolio
          </a>
          <a
            className="font font-poppins xl:text-[1rem] 2xl:text-lg  tracking-tighter"
            href="#"
          >
            Services
          </a>
          <a
            className="font font-poppins xl:text-[1rem] 2xl:text-lg  tracking-tighter"
            href="#"
          >
            About
          </a>
        </div>
      </div>
      <div className="">
        <p className="font font-poppins mt-[3vh] xl:text-[1rem] 2xl:text-lg text-[#FF8E82]">
          Social Media
        </p>
        <div className="mt-[4.9vh] flex flex-col">
          <a
            className="font font-poppins xl:text-[1rem] 2xl:text-lg tracking-tighter"
            href="#"
          >
            Instagram
          </a>
          <a
            className="font font-poppins xl:text-[1rem] 2xl:text-lg  tracking-tighter"
            href="#"
          >
            Behance
          </a>
          <a
            className="font font-poppins xl:text-[1rem] 2xl:text-lg  tracking-tighter"
            href="#"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};
