import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Footer from "../Home/Pages/Footer/Footer";
import { motion } from "framer-motion";
import {apiClient} from "../../lib/api-client"
import {GET_PROJECTS} from "../../utils/constants"
import {useAppStore} from "../../Store"
import {useParams} from "react-router-dom";
const Project = () => {
  const {projects,setProjects} = useAppStore();
  document.body.setAttribute("theme", "white");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if(projects.length === 0){
      get_projects();
    }
  }, [projects])

  const get_projects = async (page=1) => {
    try {
      const response = await apiClient(`${GET_PROJECTS}?page=${page}&limit=${5}`,{withCredentials:true});
      if(response.status === 200){
        setProjects(response.data.projects);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if(projects.length === 0){
    return <div>Loading...</div>
  }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      className=" text-[#18181B]"
    >
      <div className="w-full ">
        <h1 className="no-select opacity-95 drop-shadow-xl uppercase w-full text-center font-extrabold tracking-tighter text-[6em] sm:text-[8em] md:text-[12em] xl:text-[14rem] 2xl:text-[22em] ">
          Projects
        </h1>
      </div>
      <Cards />
      <Footer />
    </motion.div>
  );
};

export default Project;
