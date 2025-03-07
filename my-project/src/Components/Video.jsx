import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Video() {
  const textPlace = () => {
    const width = window.innerWidth;
    if (width > 1700) {
      return 220;
    } else if (width > 1500) {
      return 200;
    } else if (width > 1300) {
      return 180;
    } else if (width > 1000) {
      return 70;
    } else {
      return 0;
    }
  };
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".videoContainer",
        start: "top -10%",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    tl.to(
      ".clipRectangle",
      {
        "--clipReact": "28%",
        "--clipReactRound": "22px",
        ease: "power2",
      },
      "b"
    )
      .to(
        ".text-lef",
        {
          xPercent: -textPlace(),
        },
        "b"
      )
      .to(
        ".text-rigt",
        {
          xPercent: textPlace(),
        },
        "b"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <video
      id="page3-video"
      autoPlay
      loop
      muted
      className="clipRectangle h-full w-full object-cover"
      src="/Architectural_animation_for_the_office_building_in_Australia_3D_Visualization_for_Fenders_Katsalidis(2160p).webm"
    />
  );
}

export default Video;
