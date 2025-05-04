import React from "react";
import { useAppStore } from "../../../Store/index";
import { useNavigate } from "react-router-dom";
const FeaturedProject = () => {
  const { latestProjects } = useAppStore();
  return (
    <section className="px-4 md:px-8 py-2">
      <div>
        <h1 className="font-bold text-6xl md:text-8xl xl:text-9xl tracking-tighter font-Roboto">
          Featured
        </h1>
        <h1 className="font-bold text-6xl md:text-8xl xl:text-9xl tracking-tighter font-Roboto">
          Work
        </h1>
      </div>
      <div className="grid gap-4 py-8">
        {latestProjects.map((item, idx) => {
          return <Container key={idx} item={item} index={idx} />;
        })}
      </div>
    </section>
  );
};

export default FeaturedProject;

const Container = ({ item, index }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/project/${item._id}`);
  };
  return (
    <div className="grid pb-[1rem] md:pb-[9rem] gap-4 grid-cols-1 md:grid-cols-2 w-full">
      <div className="">
        <div onClick={handleNavigate} className="group w-[80%] md:w-full">
          <img
            className="object-cover group md:w-full "
            src={item.mainImage}
            alt=""
          />
          <div className="w-full mt-2">
            <p className="relative text-[0.6rem] md:text-[0.8rem] group uppercase flex justify-between overflow-hidden cursor-pointer tracking-tight font-bold">
              <span>
                (01{index + 1}) {item.title}
              </span>
              <span className="uppercase group-hover:-translate-y-full transition-all ease-in-out duration-100 text-zinc-600 tracking-tight font-bold">
                2024
              </span>
              <span className="uppercase group-hover:translate-y-0 absolute transition-all ease-in-out duration-100 right-0 translate-y-full  tracking-tight font-bold">
                VIEW PROJECT
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className=" flex justify-end">
        <div onClick={handleNavigate} className="group w-[80%] md:w-full">
          <img
            className="object-cover group w-full"
            src={item.previewImage}
            alt=""
          />
          <div className="w-full mt-2">
            <p className="relative text-[0.6rem] md:text-[0.8rem] uppercase flex justify-between overflow-hidden cursor-pointer tracking-tight font-bold">
              <span>
                (02{index + 1}) {item.title}
              </span>
              <span className="uppercase group-hover:-translate-y-full transition-all ease-in-out duration-100 text-zinc-600 tracking-tight font-bold">
                2024
              </span>
              <span className="uppercase group-hover:translate-y-0 absolute transition-all ease-in-out duration-100 right-0 translate-y-full  tracking-tight font-bold">
                VIEW PROJECT
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
