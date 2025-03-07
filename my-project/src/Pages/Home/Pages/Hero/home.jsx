import React, { useEffect } from "react";
import Hero from "./hero";
import Marquee from "./marquee";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

function home() {
  useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home",
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
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div className="relative home h-[250vh]">
      <div className="w-full sticky top-0 left-0">
        <Hero />
        <Marquee />
      </div>
    </div>
  );
}

export default home;
