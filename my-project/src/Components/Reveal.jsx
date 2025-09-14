import { useEffect } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9 ,0 ,0.1 ,1");

const Reveal = () => {
  const hasLoaded = localStorage.getItem("hasLoaded");
  useEffect(() => {
    if (!hasLoaded) {
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: "hop",
        },
      });

      const counts = document.querySelectorAll(".count");

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 0.5,
            stagger: 0.075,
          },
          index * 1
        );
        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-120%",
              duration: 0.5,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }
      });

      tl.to(".loading-spiner", {
        opacity: 0,
      });

      tl.to(".word h1", {
        y: "0%",
        duration: 0.5,
      });

      tl.to(".divider", {
        scaleY: "100%",
        duration: 0.5,
        onComplete: () => {
          gsap.to(".divider", { opacity: 0, duration: 0.4, delay: 0.3 });
        },
      });

      tl.to(
        "#word-1 h1",
        {
          y: "100%",
          duration: 0.5,
        },
        "a"
      );

      tl.to(
        "#word-2 h1",
        {
          y: "-100%",
          duration: 0.5,
        },
        "a"
      );

      tl.to(".loading-block", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.5,
        stagger: 0.1,
        delay: 0.75,
      });
      tl.set(".Loader", {
        zIndex: -100,
      });
    }
    return () => {};
  }, []);

  return (
    <div className="Loader fixed z-[200]  top-0 left-0 w-full h-[100svh] overflow-hidden z-5 font-NeueMachina bg-dark-gradiant font-bold text-white">
      <div className="overlay absolute top-0 w-full h-full flex">
        <div className="loading-block w-[99%] h-full bg-[#303030]"></div>
        <div className="loading-block w-full h-full bg-[#303030]"></div>
      </div>

      <div className="intro-logo text-[3rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[1.3rem]">
        <div className="word overflow-hidden" id="word-1">
          <h1 className="text-center translate-y-[120%] font-signature text-white font-light ">
            <span>Naveed</span>
          </h1>
        </div>
        <div className="word overflow-hidden" id="word-2">
          <h1 className=" text-center translate-y-[-120%] font-signature text-white font-light  ">
            <span>Mughal</span>
          </h1>
        </div>
      </div>

      <div className="divider scale-y-0 absolute top-0 left-[49.75%] -translate-x-1/2 origin-top w-[1px] h-full bg-white"></div>

      <div className="spiner-container absolute bottom-[10%] left-[49.75%] -translate-x-1/2">
        <div className="loading-spiner"></div>
      </div>

      <div className="counter absolute top-1/2 left-1/2 -translate-x-1/2 z-10 -translate-y-1/2">
        <div className="count absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              0
            </h1>
          </div>
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              9
            </h1>
          </div>
        </div>
        <div className="count absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              2
            </h1>
          </div>
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              8
            </h1>
          </div>
        </div>
        <div className="count absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              6
            </h1>
          </div>
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              5
            </h1>
          </div>
        </div>
        <div className="count absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              8
            </h1>
          </div>
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              8
            </h1>
          </div>
        </div>
        <div className="count absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              9
            </h1>
          </div>
          <div className="digit flex-1 pt-[1rem] overflow-hidden">
            <h1 className=" text-center relative translate-y-[120%] will-change-transform text-white font-extrabold text-[15rem]">
              9
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reveal;
