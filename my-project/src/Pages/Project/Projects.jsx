import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GET_ALL_PROJECTS } from "../../utils/constants";
import { apiClient } from "../../lib/api-client";
import { useAppStore } from "../../Store/index";
import Loader from "../../Components/Loader";
import { useNavigate, Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { projects, setProjects } = useAppStore();
  const horizontalSection = useRef(null);
  const slider = useRef(null);

  useEffect(() => {
    const sliderElement = slider.current;
    const sectionElement = horizontalSection.current;

    const totalScrollWidth = sliderElement?.scrollWidth + 80;
    const viewportWidth = window.innerWidth;

    gsap.to(sliderElement, {
      x: -(totalScrollWidth - viewportWidth),
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: sectionElement,
        start: "top top",
        end: () => `+=${totalScrollWidth - viewportWidth} `,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    const getAllProjects = async () => {
      const responce = await apiClient.get(GET_ALL_PROJECTS);
      if (responce.status == 200) {
        if (responce?.data?.projects) setProjects(responce.data.projects);
      }
    };

    if (projects.length === 0) {
      getAllProjects();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projects]);

  if (projects.length === 0) {
    return <Loader />;
  }
  return (
    <section
      ref={horizontalSection}
      className="projects-section font-Gilgan w-full h-[100vh] relative overflow-hidden"
    >
      <div className="h-full flex flex-col gap-4 w-full px-8 py-4 sticky top-0 overflow-hidden">
        <header className="flex justify-between items-center">
          <h1 className=" text-3xl sm:text-5xl font-bold tracking-tighter">
            Architecture's
          </h1>
          <Link
            to={"/"}
            className="bg-black text-white px-6 py-2 mt-2 rounded-[20px]"
          >
            HOME
          </Link>
        </header>

        <div ref={slider} className="slider flex gap-4 h-[70vh] w-max mt-8">
          {projects.map((project, idx) => (
            <Card
              key={idx}
              mainImage={project.mainImage}
              id={project._id}
              title={project.title}
            />
          ))}
        </div>

        <div className="flex justify-between items-end mt-8">
          <h1 className="md:text-6xl lg:text-7xl 2xl:text-8xl font-bold tracking-tighter">
            ALL WORKS <sup className="leading-1">({projects.length})</sup>
          </h1>
          <p className="uppercase text-[0.8rem] md:text-sm lg:text-base font-medium">
            Scroll DOWN to explore
          </p>
          <div>
            <p className="uppercase text-[0.8rem] md:text-sm lg:text-base font-medium">
              ALL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

const Card = ({ mainImage, id, title }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/project/${id}`);
  };
  return (
    <div
      onClick={handleNavigate}
      key={id}
      className="lg:w-[30vw] md:w-[40vw] sm:w-[50vw] w-[70vw] 2xl:w-[20vw] flex items-end"
    >
      <img src={mainImage} className="w-full object-cover" alt="" />
    </div>
  );
};
