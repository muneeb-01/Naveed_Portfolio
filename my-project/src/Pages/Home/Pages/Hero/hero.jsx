import React, { useEffect } from "react";
import gsap from "gsap";
const Hero = React.memo(() => {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      "#Hello",
      {
        opacity: 0,
        stagger: 0.075,
      },
      { opacity: 1 }
    );
    return () => {};
  }, []);

  return (
    <section
      className="relative z-10 clipContainer bg-dark-gradiant h-screen"
      aria-label="Intro Section"
    >
      {/* Main Title */}
      <h1
        id="Hello"
        className="no-select absolute w-full top-1/3 sm:top-[42%] -translate-y-1/2 text-center font-extrabold text-dark text-8xl sm:text-10xl md:text-9xl xl:text-[22rem] 2xl:text-[28rem]"
        aria-hidden="true"
      >
        HELLO
      </h1>

      {/* Subtitle: Name */}
      <div className="absolute top-[32.5%] sm:top-[40%] left-1/2 -translate-x-1/2 text-white w-[90vw] text-center flex flex-col justify-center items-center no-select">
        <h2 className="font-signature font-medium text-3xl sm:text-5xl md:text-6xl xl:text-7xl">
          Naveed Mughal
        </h2>
      </div>

      {/* Experience Info */}
      <div className="absolute text-white font-poppins bottom-[10%] left-[8%]">
        <ul className="list-none">
          <li className="text-sm sm:text-base font-medium">
            {new Date().getFullYear() - 2018} Years Of Experience
          </li>
        </ul>
        <p className="text-xs sm:text-sm pl-3 sm:pl-5 font-light">
          2018 - {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
});

export default Hero;
