import React, { useState } from "react";
import { apiClient } from "../../lib/api-client";
import { useAppStore } from "../../Store";
import {
  ADD_PROJECT_INFORMATION,
  ADMIN_LOGOUT_ROUTE,
  UPLOAD_PROJECT_IMAGES,
} from "../../utils/constants";
import { toast } from "react-toastify";
import LandingPageInfo from "./Components/LandingPageInfo";

const AdminProfile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const handleLogout = async () => {
    try {
      const responce = await apiClient.get(ADMIN_LOGOUT_ROUTE, {
        withCredentials: true,
      });
      if (responce.status === 200) {
        setUserInfo(undefined);
        window.location.reload;
      }
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };

  return (
    <div className="w-full py-8 relative">
      <button
        onClick={handleLogout}
        className="px-3 py-1 rounded-full fixed top-4 right-5 text-white font-poppins text-sm bg-red-600"
      >
        LOGOUT
      </button>
      <LandingPageInfo />
      <AddProjects />
    </div>
  );
};
export default AdminProfile;

const AddProjects = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [Type, setType] = useState("");
  const [category, setCategory] = useState("");

  const isValid = () => {
    if (title.length === 0) {
      toast.info("Title is Required.");
      return false;
    }
    if (description.length === 0) {
      toast.info("Description is Required.");
      return false;
    }
    if (client.length === 0) {
      toast.info("Client name is Required.");
      return false;
    }
    if (Type.length === 0) {
      toast.info("Project Type is Required.");
      return false;
    }
    if (category.length === 0) {
      toast.info("Project Category is Required.");
      return false;
    }
    if (images.length < 5) {
      toast.info("5 images must be selected");
      return false;
    }
    return true;
  };

  const imageHandler = (e) => {
    const adminSelectedFiles = e.target.files;
    const maxFilesLength = 5;
    const inpFiles = [];

    if (adminSelectedFiles.length > maxFilesLength) {
      toast.info(`Only first ${maxFilesLength} files will uploaded.`);
    } else if (adminSelectedFiles.length === 0) {
      toast.error("Images are Required");
      return;
    }

    for (let i = 0; i < maxFilesLength; i++) {
      if (adminSelectedFiles[i]) {
        inpFiles.push(adminSelectedFiles[i]);
      }
    }
    setImages(inpFiles);
  };
  const HandleAddProject = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      try {
        const responce = await apiClient.post(UPLOAD_PROJECT_IMAGES, formData, {
          withCredentials: true,
        });
        if (responce.status === 200) {
          const imagesUrl = responce.data;
          const uploadProjectInformation = await apiClient.post(
            ADD_PROJECT_INFORMATION,
            { Type, description, imagesUrl, title, client, category },
            { withCredentials: true }
          );
          if (uploadProjectInformation.status === 200) {
            toast.success("Project uploaded successfuly.");
            setCategory("");
            setClient("");
            setDescription("");
            setTitle("");
            setType("");
            setImages([]);
            document.getElementById("files").value = "";
          }
        }
      } catch (error) {
        toast.error("Somthing went wrong.");
      }
    }
  };

  return (
    <div className="w-full font-poppins text-white">
      <h1 className="font font-Gilgan text-xl pt-20 pb-6 text-center">
        Add Project
      </h1>
      <form
        action="submit"
        className="w-full flex justify-center items-center"
        onSubmit={HandleAddProject}
        encType="multipart/form-data"
      >
        <div className="w-[60%] flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="add title here..."
            ></input>
          </div>
          <div>
            <label
              htmlFor="Description"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="Description"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="add description here..."
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="client"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Client Name
            </label>
            <input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              id="client"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="add client name here..."
            ></input>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ie. Interior, Exterior"
            ></input>
          </div>
          <div>
            <label
              htmlFor="Type"
              className="block mb-2 text-sm font-medium  dark:text-white"
            >
              Type
            </label>
            <input
              value={Type}
              onChange={(e) => setType(e.target.value)}
              id="Type"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ie. Commercial, Residential"
            ></input>
          </div>
          <div>
            <label htmlFor="files">Choose multiple files: </label>
            <input
              onChange={imageHandler}
              type="file"
              id="files"
              name="files[]"
              accept="image/*"
              multiple
              encType="multipart/form-data"
            />
          </div>
          <button className=" bg-green-500 py-1 rounded-lg">Add Project</button>
        </div>
      </form>
    </div>
  );
};
