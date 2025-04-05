const Projectsmodel = require("../Models/Projectsmodel");
const ProjectModel = require("../Models/Projectsmodel");

module.exports.AddProjectImages = async (req, res) => {
  try {
    console.log(req.files);
    const { userId } = req;
    
    if (!userId) {
      return res.status(401).send("Unauthorized user");  // Changed to 401 for Unauthorized
    }
    
    const files = req.files;
    
    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded.");  // Changed to 400 for Bad Request
    }
    
    const fileUrls = files.map(file => file.path);  // Generate URLs for each uploaded file
    
    if (fileUrls.length === 0) {
      return res.status(500).send("Unable to upload files.");  // Changed to 500 for server error
    }
    
    res.status(200).json({ message: 'Files uploaded successfully', fileUrls });
    
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while uploading files.");
  }
};


module.exports.AddProjectInfo = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) return res.status(202).send("Unauthenticated User.");
    const { Type, description, imagesUrl, title, client, category } = req.body;

    const Project = await ProjectModel.create({
      Type,
      description,
      imagesUrl,
      title,
      client,
      category,
    });
    res.status(200).json({ Project });
  } catch (error) {}
};

module.exports.GetProjectInfo = async (req, res) => {
  try {
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * 10;

    const projects = await ProjectModel.find().skip(skip).limit(limit);
    const totalItems = await ProjectModel.countDocuments();
    
    const totalPages = Math.ceil(totalItems/limit);

    res.status(200).json({ projects,totalPages,currentPage:page});
  } catch (error) {}
};

module.exports.GetProjectInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findById(id);
    res.status(200).json({ project });
  } catch (error) {
    
  }
}

module.exports.GetlatestProjects = async (req,res)=>{
  try {
    const projects = await Projectsmodel.find().sort({_id:-1}).limit(5);
    res.status(200).json({projects});
  } catch (error) {
  }
}
