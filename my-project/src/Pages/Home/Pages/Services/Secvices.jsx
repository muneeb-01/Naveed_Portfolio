import React from "react";

const services = [
  "Interior Design",
  "Architecture",
  "Workshops & Educational Services",
  "Animation",
  "Exterior Design",
];

const Services = () => {
  return (
    <section className="w-full min-h-full flex flex-col justify-around items-center xl:gap-14">
      <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl tracking-tight font-bold font-Gilgan text-center border-b-2 pb-4 max-sm:mb-4 w-full">
        SERVICES
      </h1>

      <ul className="flex flex-col gap-4 sm:gap-6 xl:gap-10">
        {services.map((service, index) => (
          <li
            key={index}
            className="text-lg sm:text-2xl lg:text-6xl xl:text-7xl 2xl:text-8xl italic font-Crisp text-center"
          >
            {service}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Services;
