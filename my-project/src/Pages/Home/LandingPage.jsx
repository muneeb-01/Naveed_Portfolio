import React from "react";
import Home from "./Pages/Hero/home";
import VideoContainer from "./Pages/VideoContainer/VideoContainer";
import Services from "./Pages/Services/Secvices";
import Stack from "./Pages/Stack/Stack";
import Footer from "./Pages/Footer/Footer";
import { GET_LANDING_PAGE_INFO,GET_LATEST_PROJECTS } from "../../utils/constants";
import {apiClient} from "../../lib/api-client";
import {useAppStore} from "../../Store";
import { useEffect,useState } from "react";

const LandingPage = () => {
  const { paragraphs, setParagraphs} = useAppStore();
  const [latestProjects, setLatestProjects] = useState(null);
  useEffect(() => {
    // Only fetch paragraphs if they are not already fetched
    if (!paragraphs) {
      getParagraphs();
    }
    
    // Only fetch latest projects if they are not already fetched
    if (!latestProjects) {
      getLatestProjects();
    }
  }, [paragraphs, latestProjects]); // Only trigger when paragraphs or latestProjects change

  const getParagraphs = async () => {
    try {
      const response = await apiClient.get(GET_LANDING_PAGE_INFO, { withCredentials: true });
      if (response.status === 200) {
        setParagraphs(response.data.paragraph); // Save data to store
      } else {
        console.log("Failed to fetch paragraphs");
      }
    } catch (error) {
      console.error("Error fetching paragraphs:", error);
    }
  };

  const getLatestProjects = async () => {
    try {
      const response = await apiClient.get(GET_LATEST_PROJECTS, { withCredentials: true });
      if (response.status === 200) {
        setLatestProjects(response.data.projects); // Save projects to store
      } else {
        console.log("Failed to fetch latest projects");
      }
    } catch (error) {
      console.error("Error fetching latest projects:", error);
    }
  };

  // Show loading state if either paragraphs or latestProjects are not yet available
  if (!paragraphs || !latestProjects) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Home />
      <VideoContainer />
      <Stack projects = {latestProjects} />
      <Services />
      <Footer />
    </>
  );
};

export default LandingPage;
