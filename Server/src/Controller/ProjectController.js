const { response } = require("express");
const Projectsmodel = require("../Models/Projectsmodel");
const ProjectModel = require("../Models/Projectsmodel");
const cloudinary = require("../config/cloudinary");
module.exports.AddProjectImages = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).send("Unauthorized user");
    }
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    const fileUrl = file.path;

    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while uploading the file.");
  }
};

module.exports.AddProjectInfo = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(401).send("Unauthenticated User."); // better status

    const { type, description, images, title, client, category, workType } =
      req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded." });
    }

    const selectedImages = images.slice(0, 5); // First 5 images
    const mainImage = images[0]; // First image as main image

    await ProjectModel.create({
      type,
      description,
      images,
      selectedImages,
      mainImage,
      title,
      client,
      category,
      workType,
    });

    return res.status(200).json({ message: "Project uploaded successfully" });
  } catch (error) {
    // CLEANUP: Delete uploaded images if project creation fails
    const { images } = req.body;
    if (images && Array.isArray(images)) {
      for (const imageUrl of images) {
        console.log(imageUrl);
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy("uploads/" + publicId);
          } catch (deleteErr) {}
        }
      }
    }

    return res.status(500).json({
      message: error.message.includes("title")
        ? "Title must be unique"
        : "Internal Server Error",
    });
  }
};

module.exports.GetProjectInfo = async (req, res) => {
  try {
    // Get page and limit from query parameters (defaults to 1 and 5 if not provided)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // Calculate the number of items to skip (pagination logic)
    const skip = (page - 1) * limit;

    // Fetch projects with pagination
    const projects = await ProjectModel.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    // Count total number of projects
    const totalItems = await ProjectModel.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Format the projects response
    const projectResponse = projects.map((project) => ({
      _id: project._id,
      title: project.title,
      mainImage: project.mainImage,
    }));

    // Send response with projects and pagination info
    res
      .status(200)
      .json({ projects: projectResponse, totalPages, currentPage: page });
  } catch (error) {
    // Return an error if something goes wrong
    console.error("Error fetching project info:", error);
    res.status(500).json({ error: "Failed to fetch project information" });
  }
};

module.exports.GetProjectInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findById(id);
    res.status(200).json({ project });
  } catch (error) {}
};

module.exports.GetlatestProjects = async (req, res) => {
  try {
    const projects = await Projectsmodel.find()
      .sort({ _id: -1 })
      .limit(3)
      .select("mainImage title _id selectedImages");

    // Then pick the first image manually
    const processedProjects = projects.map((project) => ({
      _id: project._id,
      title: project.title,
      mainImage: project.mainImage,
      previewImage: project.selectedImages?.[4] || null,
    }));

    res.status(200).json({ projects: processedProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.SaveProjectChanges = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedImages, mainImage } = req.body;
    const project = await ProjectModel.findById(id);

    project.selectedImages = selectedImages;
    project.mainImage = mainImage;

    await project.save();

    res.status(200).json({ project });
  } catch (error) {}
};

module.exports.GetProjectInfoByIdForUI = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectModel.findById(id).lean();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { images, ...projectWithoutImages } = project;
    res.status(200).json({ project: projectWithoutImages });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.DeleteProjectByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Project ID is missing");

    const deletedProject = await ProjectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).send("Project not found");
    }

    if (deletedProject.images && Array.isArray(deletedProject.images)) {
      for (const imageUrl of deletedProject.images) {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy("uploads/" + publicId);
          } catch (deleteErr) {
            return res.status(500).send("Server error while deleting images");
          }
        }
      }
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while deleting project");
  }
};

function extractPublicId(url) {
  try {
    const parts = url.split("/");
    const fileName = parts.pop(); // dnwjwcb6vu1apkk5ytoi.png
    const publicId = fileName.split(".")[0]; // remove extension
    return `${publicId}`; // full public ID with folders
  } catch {
    return null;
  }
}

module.exports.GetAllProjects = async (req, res) => {
  try {
    const projects = await Projectsmodel.find()
      .sort({ _id: -1 })
      .select("mainImage title _id");

    res.status(200).json({ projects });
  } catch (error) {}
};
