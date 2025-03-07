import React, { useEffect, useRef } from "react";
import Video from "../../../../Components/Video";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const VideoContainer = () => {
  const salmonSection = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: salmonSection.current,
          start: "bottom bottom",
          end: "start 0%",
          scrub: true,
          onEnter: () => {
            document.body.setAttribute(
              "theme",
              salmonSection.current.dataset.color
            );
          },
          onEnterBack: () => {
            document.body.setAttribute("theme", "white");
          },
        },
      },
      "c"
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);
  return (
    <div className="videoContainer w-full relative z-10 h-[250vh]">
      <div
        ref={salmonSection}
        data-color="salmon"
        className="section overflow-hidden w-full h-screen sticky top-0 left-0"
      >
        <Video />
        <div className="absolute mix-blend-exclusion text-white  flex gap-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-lef font-Gilgan  tracking-tighter text-[1em] sm:text-[2em] xl:text-[3em] 2xl:text-[4em] font-medium">
            Signature
          </h1>
          <h1 className="text-rigt font-Gilgan  tracking-tighter text-[1em] sm:text-[2em] xl:text-[3em] 2xl:text-[4em] font-medium">
            Signature
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
