const AdminModel = require("../Models/Admin");
const LandingInfoModel = require("../Models/LandingPageInfo");
const dbgr = require("debug")("development:DataController");

module.exports.AddLandingPageInfo = async (req, res) => {
  try {
    const { userId } = req;
    const { paragraph_1, paragraph_2 } = req.body;

    const admin = await AdminModel.findById(userId);
    if (!admin) res.status(202).send("Unauthorized user detected.");

    let paragraphs;

    const isParagraph = await LandingInfoModel.findOne();
    if (isParagraph) {
      paragraphs = await LandingInfoModel.findOneAndUpdate({
        paragraph_1,
        paragraph_2,
      });
    } else {
      paragraphs = await LandingInfoModel.create({
        paragraph_1,
        paragraph_2,
      });
    }
    res.status(200).json({ paragraphs });
  } catch (error) {
    dbgr("Error from /AddLandingPageInfo");
  }
};

module.exports.GetLandingPageInfo = async (req, res) => {
  try {
    const paragraph = await LandingInfoModel.findOne();
    if (!paragraph) res.status(202).send("Add the paragraph to get it.");

    res.status(200).json({ paragraph });
  } catch (error) {
    dbgr("Error from /GetLandingPageInfo");
  }
};
