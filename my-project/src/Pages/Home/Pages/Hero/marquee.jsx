import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function marquee() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 30%",
        end: "start 50%",
        onEnter: () => {
          document.body.setAttribute("theme", sectionRef.current.dataset.color);
        },
        onEnterBack: () => {
          document.body.setAttribute("theme", "dark");
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
      ref={sectionRef}
      data-color="white"
      className="marqueeContainer absolute top-0 section no-select w-full h-screen overflow-hidden"
    >
      <div className="heading font-poppins  text-center mt-20 sm:mt-24">
        <h1 className="text-sm  tracking-tighter sm:text-sm lg:text-lg 2xl:text-2xl  text-nowrap">
          Transforming Spaces with Innovative Design <br /> and Creative
          Solutions
        </h1>
      </div>
      <div className="marquee text-3xl sm:text-6xl lg:text-4xl 2xl:text-6xl scale-[1] absolute top-1/2 font-semibold font-NeueMachina left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
        {[
          { direction: "row-left" },
          { direction: "row-right" },
          { direction: "row-left" },
          { direction: "row-right" },
        ].map((item, idx) => {
          return (
            <div
              key={idx}
              className={`row ${item.direction} ${
                item.direction === "row-left"
                  ? " -translate-x-2/3"
                  : " -translate-x-3/2"
              } w-full py-2 flex flex-nowrap items-center gap-2 sm:gap-8`}
            >
              {[
                "inspiration",
                "creativity",
                "elegance",
                "design",
                "vision",
                "harmony",
                "transformation",
                "innovation",
                "ambiance",
              ].map((item, id) => {
                return (
                  <div
                    className="flex justify-center items-center gap-2 sm:gap-8"
                    key={id}
                  >
                    <h1 className="">{item}</h1>
                    {id == 8 ? (
                      ""
                    ) : (
                      <div className="circle w-[1.8rem] h-[1.8rem] md:w-[3.5rem] md:h-[3.5rem] lg:size-[2rem] rounded-full "></div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="absolute  text-sm font-medium font-poppins bottom-[10%] left-[8%]">
        <li className="fs1 ">6 Years Of Experience</li>
        <p className=" text-xs text-yellow-500  pl-5 fs1">2018 - 2024</p>
      </div>
    </div>
  );
}

export default marquee;
