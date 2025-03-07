import React from "react";

function Services() {
  return (
    <>
      <div className="horizontal no-select overflow-hidden section w-full px-20 pb-32 h-screen relative mt-[8vh]">
        <div className="w-[100%] min-h-[100%] flex flex-col  justify-around items-center xl:gap-14">
          <h1 className="fs1  xl:text-3xl  tracking-tight font-bold font-Gilgan place-self-center w-full text-center border-b-4 pb-16">
            SERVICES
          </h1>
          <h1 className="fs2-horizontal italic font-Crisp place-self-center">
            Interior Design
          </h1>
          <h1 className="fs2-horizontal italic font-Crisp place-self-center">
            Architecture
          </h1>
          <h1 className="fs2-horizontal italic font-Crisp place-self-center">
            Workshops & Educational Services
          </h1>
          <h1 className="fs2-horizontal italic font-Crisp place-self-center">
            Animation
          </h1>
          <h1 className="fs2-horizontal italic font-Crisp place-self-center">
            Exterior Design
          </h1>
        </div>
        <div className=" 2xl:size-[30rem] xl:size-[20rem] rounded-full absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/2 overflow-hidden bg-cover bg-center">
          <img
            src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
export default Services;
