import React, { useState, useCallback, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Stylesheets/AddProject.css";
import { apiClient } from "../lib/api-client";
import {
  UPLOAD_PROJECT_IMAGES,
  ADD_PROJECT_INFORMATION,
} from "../utils/constants";

// Helper function to validate form inputs
const validateForm = (formData) => {
  const errors = [];
  if (!formData.title.trim()) errors.push("Project title is required!");
  if (!formData.description.trim()) errors.push("Description is required!");
  if (!formData.type.trim()) errors.push("Property type is required!");
  if (!formData.workType.trim()) errors.push("Work type is required!");
  if (!formData.category.trim()) errors.push("Project category is required!");
  if (!formData.client.trim()) errors.push("Client name is required!");

  if (formData.description.length <= 20)
    errors.push("Descrition is too short!");
  if (formData.images.length === 0)
    errors.push("Please upload at least one image!");

  return errors;
};

function Form() {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    workType: "",
    category: "",
    client: "",
    images: [],
  });

  // Handle input field changes
  const handleChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? Array.from(files) : value,
    }));
  }, []);

  // Handle form reset after submission
  const resetForm = () => {
    setIsSubmitting(false);
    setFormData({
      title: "",
      description: "",
      type: "",
      workType: "",
      category: "",
      client: "",
      images: [],
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Clears the file input
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    setIsSubmitting(true);
    const uploadedImageUrls = [];
    const failedImages = [];

    class Queue {
      constructor(items = []) {
        this.items = items;
      }

      enqueue(item) {
        this.items.push(item);
      }

      dequeue() {
        return this.items.shift();
      }

      isEmpty() {
        return this.items.length === 0;
      }
    }

    const imageQueue = new Queue([...formData.images]);

    try {
      // Upload images concurrently with a limit (e.g., 3 parallel uploads)
      while (!imageQueue.isEmpty()) {
        const file = imageQueue.dequeue();
        const imageFormData = new FormData();
        imageFormData.append("image", file);

        try {
          const response = await apiClient.post(
            UPLOAD_PROJECT_IMAGES,
            imageFormData,
            {
              withCredentials: true,
            }
          );

          if (response?.data?.fileUrl && response?.status === 200) {
            uploadedImageUrls.push(response.data.fileUrl);
          } else {
            console.log(response);
          }
        } catch (err) {
          failedImages.push(file.name);
          toast.error("Error Uploading files");
        }
      }
      if (uploadedImageUrls.length > 0) {
        const projectData = { ...formData, images: uploadedImageUrls };
        const uploadProjectInformation = await apiClient.post(
          ADD_PROJECT_INFORMATION,
          projectData,
          { withCredentials: true }
        );

        if (uploadProjectInformation.status === 200) {
          toast.success("Project uploaded successfully!");
          resetForm();
        } else {
          toast.error("Error uploading project information.");
          resetForm();
        }
      }

      if (failedImages.length > 0) {
        toast.error(`${failedImages.length} image(s) failed to upload.`);
      }
    } catch (error) {
      toast.error("Error submitting the project.");
      resetForm();
    }
  };

  return (
    <main className="w-full text-[var(--dark)]">
      <h1 id="add-project-heading">Add Project</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Project Title"
          name="title"
          placeholder="Title here..."
          value={formData.title}
          onChange={handleChange}
        />
        <TextareaField
          label="Description"
          name="description"
          placeholder="Add description..."
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          label="Property Type"
          name="type"
          placeholder="Residential, Commercial, etc."
          value={formData.type}
          onChange={handleChange}
        />
        <Input
          label="Work Type"
          name="workType"
          placeholder="Interior, Exterior, etc."
          value={formData.workType}
          onChange={handleChange}
        />
        <Input
          label="Category"
          name="category"
          placeholder="Apartment, Office, Villa, etc."
          value={formData.category}
          onChange={handleChange}
        />
        <Input
          label="Client Name"
          name="client"
          placeholder="Client's full name..."
          value={formData.client}
          onChange={handleChange}
        />
        <FileInput
          ref={fileInputRef}
          label="Upload Images"
          name="images"
          onChange={handleChange}
        />

        <button
          disabled={isSubmitting}
          className={`btn ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          id="Add-project-button"
          type="submit"
        >
          {isSubmitting ? "Uploading..." : "Submit"}
        </button>
      </form>

      <ToastContainer />
      <div className="h-[60px]"></div>
    </main>
  );
}

export default Form;

// --- Sub-components ---

const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) => (
  <div className="input-field">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const TextareaField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 5,
}) => (
  <div className="input-field">
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onChange}
    ></textarea>
  </div>
);

const FileInput = ({ label, name, onChange, ref }) => (
  <div className="input-field">
    <label>{label}</label>
    <input
      ref={ref}
      id="images"
      type="file"
      name={name}
      accept=".jpg, .jpeg, .png"
      multiple
      onChange={onChange}
    />
  </div>
);
