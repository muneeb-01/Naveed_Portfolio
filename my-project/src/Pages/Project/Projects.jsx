import React, { useRef, useEffect, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "../../Store/index";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { projects } = useAppStore();
  const horizontalSection = useRef(null);
  const slider = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sliderEl = slider.current;
    const sectionEl = horizontalSection.current;
    if (!sliderEl || !sectionEl) return;

    const totalScrollWidth = sliderEl.scrollWidth + 80;
    const viewportWidth = window.innerWidth;

    const animation = gsap.to(sliderEl, {
      x: -(totalScrollWidth - viewportWidth),
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: `+=${totalScrollWidth - viewportWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      animation.kill(); // Kill only this animation
      ScrollTrigger.getById(animation.scrollTrigger?.id)?.kill(); // Kill associated ScrollTrigger
    };
  }, [projects]); // Re-run if projects change

  // Memoize project cards to prevent unnecessary re-renders
  const projectCards = useMemo(
    () =>
      projects.map((project) => (
        <Card
          key={project._id}
          mainImage={project.mainImage}
          id={project._id}
          title={project.title}
          navigate={navigate}
        />
      )),
    [projects, navigate]
  );

  if (!projects.length) return <Loader />;

  return (
    <section
      ref={horizontalSection}
      className="projects-section font-Gilgan w-full h-screen relative overflow-hidden"
    >
      <div className="h-full flex flex-col gap-4 w-full px-8 py-4 sticky top-0 overflow-hidden">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter">
            Architecture's
          </h1>
        </header>

        <div ref={slider} className="slider flex gap-4 h-[70vh] w-max mt-8">
          {projectCards}
        </div>

        <div className="flex justify-between items-end mt-8">
          <h1 className="md:text-6xl lg:text-7xl 2xl:text-8xl font-bold tracking-tighter">
            ALL WORKS <sup className="leading-1">({projects.length})</sup>
          </h1>
          <p className="uppercase text-[0.8rem] md:text-sm lg:text-base font-medium">
            Scroll DOWN to explore
          </p>
          <p className="uppercase text-[0.8rem] md:text-sm lg:text-base font-medium">
            ALL
          </p>
        </div>
      </div>
    </section>
  );
};

// Memoize Card component to prevent re-renders
const Card = React.memo(({ mainImage, id, title, navigate }) => {
  const handleNavigate = useCallback(() => {
    navigate(`/project/${id}`);
  }, [navigate, id]);

  return (
    <div
      onClick={handleNavigate}
      className="w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] 2xl:w-[20vw] flex items-end cursor-pointer"
    >
      <img
        src={mainImage}
        className="w-full object-cover"
        alt={title}
        loading="lazy"
      />
    </div>
  );
});

export default Projects;
