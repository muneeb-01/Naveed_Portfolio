const Projectsmodel = require("../Models/Projectsmodel");
const ProjectModel = require("../Models/Projectsmodel");

module.exports.AddProjectImages = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) res.status(202).send("Unauthorized user");
    const files = req?.files;
    const fileUrl = files.map((file) => {
      return `/uploads/projects/${file.filename}`;
    });
    if (fileUrl.length == 0)
      return res.status(202).send("Unable to upload files.");

    res.status(200).json(fileUrl);
  } catch (error) {}
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
