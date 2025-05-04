import React, { lazy, Suspense, useEffect } from "react";
import Home from "./Pages/Hero/home";
import FeaturedProject from "./Pages/FeaturedProject";
import Process from "./Pages/Process";
const VideoContainer = lazy(() =>
  import("./Pages/VideoContainer/VideoContainer")
);

const LandingPage = () => {
  return (
    <main>
      <section id="home">
        <Home />
      </section>

      <Suspense
        fallback={<div className="text-center py-10">Loading Video...</div>}
      >
        <section id="video">
          <VideoContainer />
        </section>
      </Suspense>

      <section id="services">
        <FeaturedProject />
      </section>

      <section id="services">
        <Process />
      </section>
    </main>
  );
};

export default LandingPage;
