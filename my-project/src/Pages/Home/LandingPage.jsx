import React, { lazy, Suspense, useEffect } from "react";
import Home from "./Pages/Hero/home";
import Services from "./Pages/Services/Secvices";
import Slider from "./Pages/Slider";

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

      <section className="mb-[10em]">
        <Slider />
      </section>

      <section id="services">
        <Services />
      </section>
    </main>
  );
};

export default LandingPage;
