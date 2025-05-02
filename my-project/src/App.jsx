import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lenis from "@studio-freight/lenis";
import Layout from "./Components/Layout";
// Lazy-loaded pages
import { lazy, Suspense } from "react";
import { apiClient } from "./lib/api-client";
import { GET_LATEST_PROJECTS } from "./utils/constants";
import { useAppStore } from "./Store/index";
import Reveal from "./Components/Reveal";
const LandingPage = lazy(() => import("./Pages/Home/LandingPage"));
const Project = lazy(() => import("./Pages/Project/Project"));
const SingleProject = lazy(() => import("./Pages/SingleProject/SingleProject"));

const App = () => {
  const location = useLocation();
  const { latestProjects, setLatestProjects } = useAppStore();
  const [loading, setIsloading] = useState(false);
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

    const getLatestProjects = async () => {
      try {
        setIsloading(true);
        const response = await apiClient.get(GET_LATEST_PROJECTS, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setLatestProjects(response.data.projects);
        }
      } catch (error) {
        toast.error("Internal Server error!");
      } finally {
        setIsloading(false);
      }
    };

    if (latestProjects.length === 0) {
      getLatestProjects();
    }
    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, [location.pathname]);

  if (loading || latestProjects.length === 0)
    return <p className="text-center py-2">Loading...</p>;

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
