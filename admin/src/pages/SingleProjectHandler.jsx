import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_PROJECT_BY_ID,
  SAVE_SELECTED_IMAGE_CHANGES,
  DELETE_PROJECT,
} from "../utils/constants";
import { apiClient } from "../lib/api-client";
import { MdOutlineDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleProjectHandler() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [savingChanges, setSavingChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await apiClient.get(GET_PROJECT_BY_ID + id, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const {
            selectedImages: projectSelectedImages,
            mainImage: projectMainImage,
            images: projectImages,
            title,
          } = response.data.project;
          setImages(projectImages);
          setTitle(title);
          setSelectedImages(projectSelectedImages);
          setMainImage(projectMainImage);
        }
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleImageChange = (e) => {
    const imageUrl = e.target.getAttribute("data");
    setSelectedImages((prev) =>
      e.target.checked
        ? [...prev, imageUrl]
        : prev.filter((url) => url !== imageUrl)
    );
  };

  const handleMainImage = (e) => {
    const imageUrl = e.target.getAttribute("data");
    setMainImage(imageUrl);
  };

  const saveChanges = async () => {
    setSavingChanges(true);
    try {
      const response = await apiClient.post(
        `${SAVE_SELECTED_IMAGE_CHANGES}${id}`,
        { selectedImages, mainImage },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const {
          selectedImages: projectSelectedImages,
          mainImage: projectMainImage,
        } = response.data.project;
        setSelectedImages(projectSelectedImages);
        setMainImage(projectMainImage);
        toast.success("Changes saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save changes:", error);
    } finally {
      setSavingChanges(false);
    }
  };

  const handleDelete = async (e) => {
    const approved = confirm();
    if (approved) {
      try {
        console.log(id);
        const response = await apiClient.delete(DELETE_PROJECT + id, {
          withCredentials: true,
        });
        if (response.status === 200) {
          toast.success("item Deleted Sucessfully");
          navigate("/dashboard/home");
        } else {
          toast.error("Project ID is missing");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <ToastContainer />
      <div className="w-full bg-[var(--light)] text-[var(--dark)] rounded-xl">
        <h3 className="image-title flex justify-center items-center gap-4 text-center text-sm md:text-lg xl:text-2xl">
          {title}{" "}
          <span onClick={handleDelete} className="bg-red-600 rounded-full">
            <MdOutlineDelete />
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => {
          const isSelected = selectedImages.includes(image);
          const isMain = mainImage === image;

          return (
            <div key={index} className="flex flex-col items-center">
              <img
                src={image}
                alt={image}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  checked={isSelected}
                  data={image}
                  onChange={handleImageChange}
                  type="checkbox"
                  id={`checkbox-${image}`}
                  className="w-4 h-4"
                  aria-label="Show this image"
                />
                <label
                  htmlFor={`checkbox-${image}`}
                  className="text-sm text-[var(--dark)]"
                >
                  Show
                </label>
                <input
                  checked={isMain}
                  data={image}
                  onChange={handleMainImage}
                  type="radio"
                  name="main-image"
                  id={`radio-${image}`}
                  className="w-4 h-4"
                  aria-label="Set as main image"
                />
                <label
                  htmlFor={`radio-${image}`}
                  className="text-sm text-[var(--dark)]"
                >
                  Main
                </label>
              </div>
            </div>
          );
        })}
        <button
          disabled={savingChanges}
          onClick={saveChanges}
          className={`btn py-6 text-white px-2 rounded-sm bg-blue-500 h-max ${
            savingChanges ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          {savingChanges ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="h-[60px]" />
    </main>
  );
}

export default SingleProjectHandler;
