import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer font-Gilgan w-full  px-8 border-[1px]  border-zinc-800 py-8">
      <div className="grid min-h-[90svh] md:grid-cols-3 gap-4 grid-cols-1">
        <div className="w-full md:py-0 py-8  flex justify-between items-start ">
          <div className="w-[80%]">
            <img
              className="w-full"
              src="https://cdn.prod.website-files.com/6762bbe3294789635ee71fdb/67b5cecf0984d99b23200bce_image.avif"
              alt=""
            />
          </div>
        </div>
        <div className=" w-full md:py-0 py-8  flex justify-between items-start ">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col justify-start font-bold tracking-tighter text-4xl lg:text-5xl">
              {[
                { name: "Home", route: "/" },
                { name: "Prcing", route: "/" },
                { name: "Project", route: "/project" },
                { name: "Our journey", route: "/" },
              ].map((item, idx) => {
                return (
                  <Link
                    to={item.route}
                    className="leading-tight relative  group overflow-hidden cursor-pointer"
                    key={idx}
                  >
                    <span className="block transition-all ease-in-out duration-200 group-hover:-translate-y-full">
                      {item.name}
                    </span>
                    <span className="absolute transition-all ease-in-out duration-200 block top-0 left-0 group-hover:translate-y-0 translate-y-full">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
            <p className="leading-tight block my-8 md:my-0 font-semibold relative  group overflow-hidden cursor-pointer">
              <span className="block transition-all ease-in-out duration-200 group-hover:-translate-y-full">
                INSTAGRAM
              </span>
              <span className="absolute transition-all ease-in-out duration-200 block top-0 left-0 group-hover:translate-y-0 translate-y-full">
                INSTAGRAM
              </span>
            </p>
          </div>
        </div>
        <div className=" w-full  md:py-0 py-8 flex justify-between items-start ">
          <div className="flex flex-col justify-between h-full">
            <div className="w-[100%] lg:w-[75%] font-semibold">
              <p className=" text-lg font-normal">(acknowledgement)</p>
              <p className="my-2 font-normal">
                Home Works Studio Process Gallery Contact Us (acknowledgement)
                We respectfully acknowledge the Turrbal people, the Traditional
                Owners and Custodians of the Country on which we work. We pay
                our respects to Elders past and present, and acknowledge their
                continuing connection to land, sea and community.
              </p>
            </div>
            <a
              href="https://craftr-studio.vercel.app/"
              className="leading-tight text-right font-semibold relative  group overflow-hidden cursor-pointer"
            >
              <span className="block transition-all ease-in-out duration-200 group-hover:-translate-y-full">
                MADE BY CRAFTR_STUDIO
              </span>
              <span className="absolute transition-all ease-in-out duration-200 block top-0 right-0 group-hover:translate-y-0 translate-y-full">
                MADE BY
                <span className="font-bold"> CRAFTR_STUDIO</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
