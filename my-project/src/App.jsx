import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lenis from "@studio-freight/lenis";
import Layout from "./Components/Layout";
// Lazy-loaded pages
import { lazy, Suspense } from "react";

const LandingPage = lazy(() => import("./Pages/Home/LandingPage"));
const Project = lazy(() => import("./Pages/Project/Project"));
const SingleProject = lazy(() => import("./Pages/SingleProject/SingleProject"));

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);
    lenis.scrollTo(0, { immediate: true }); // Reset scroll on route change

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <div data-scroll-container>
      <AnimatePresence mode="wait" initial={false}>
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <Routes location={location} key={location.pathname}>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/project" element={<Project />} />
              <Route path="/project/:id" element={<SingleProject />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
};

const RootApp = () => (
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
  </>
);

export default RootApp;
