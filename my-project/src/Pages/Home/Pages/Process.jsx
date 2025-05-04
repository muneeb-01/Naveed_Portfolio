import React from "react";

const Process = () => {
  return (
    <div className="px-4 py-2 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[32%_68%] gap-4">
        <div className="flex justify-start ">
          <div className=" w-full lg:w-[80%]">
            <div className="pb-4">
              <p className=" font-bold">(OUR PROCESS)</p>
            </div>
            <div className="w-full xl:w-[90%]">
              <img
                className=" lg:h-[18rem] xl:h-[20rem] 2xl:h-[22rem] w-full object-center object-cover"
                src="https://cdn.prod.website-files.com/6762bbe3294789635ee71fdb/67b81c7e7cb4fa92fa0c4db6_IMG_1494-Custom.avif"
                alt=""
              />
              <div className="mt-2">
                {[
                  "Sketch Design",
                  "Design Development",
                  "Development Application",
                  "Interior Design",
                  "Building approval plans",
                  "Construction Plans + documentation",
                ].map((item, idx) => {
                  return (
                    <p
                      key={idx}
                      className=" font-medium text-[1.1rem] p-2 border-b-[1px] border-zinc-400 tracking-tight"
                    >
                      <span className="text-zinc-600">(0{idx + 1}) </span>{" "}
                      <span>{item}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-8">
          <p className=" font-bold text-4xl sm:5xl md:text-6xl lg:text-7xl tracking-tight">
            Our approach <br /> at Architecture is designed to make your journey
            from concept to completion as smooth and enjoyable as possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Process;
