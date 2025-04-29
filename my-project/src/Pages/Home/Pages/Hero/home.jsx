import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import Hero from "./hero";
import Marquee from "./marquee";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const homeRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Set screen size once on mount
    setIsDesktop(window.innerWidth > 1024);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop || !homeRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      tl.to(
        ".clipContainer",
        {
          "--clip": "0%",
          ease: "power2",
        },
        "a"
      )
        .to(
          ".row-left",
          {
            xPercent: 0,
            stagger: 0.1,
          },
          "a"
        )
        .to(
          ".row-right",
          {
            xPercent: -30,
            stagger: 0.1,
          },
          "a"
        )
        .from(
          ".marquee",
          {
            scale: 2,
          },
          "a"
        );
    }, homeRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isDesktop]);

  return (
    <div ref={homeRef} className="relative w-full home lg:h-[250vh] h-screen">
      <div className="w-full sticky top-0 left-0">
        <Hero />
        {isDesktop && <Marquee />}
      </div>
    </div>
  );
};

export default Home;
