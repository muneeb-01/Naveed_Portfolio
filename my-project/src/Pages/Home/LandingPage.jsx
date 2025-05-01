import React, { lazy, Suspense, useEffect } from "react";
import Home from "./Pages/Hero/home";
import Services from "./Pages/Services/Secvices";
import Slider from "././Pages/Slider";
// Lazy load VideoContainer if it's media-heavy
const VideoContainer = lazy(() =>
  import("./Pages/VideoContainer/VideoContainer")
);

const usePageSetup = () => {
  useEffect(() => {
    document.body.setAttribute("theme", "white");
    // You can add scroll/animation observers here in the future
  }, []);
};

const LandingPage = () => {
  usePageSetup();

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
