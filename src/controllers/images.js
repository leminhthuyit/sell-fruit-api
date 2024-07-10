const Image = require("../models/image");

const getAllImage = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({ data: images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getImageByName = async (req, res) => {
  try {
    const { filename } = req.params;
    const image = await Image.findOne({ filename });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Check if image
    if (
      image.contentType === "image/jpeg" ||
      image.contentType === "image/png"
    ) {
      res.contentType(image.contentType);
      res.send(image.data);
    } else {
      res.status(404).json({ err: "Not an image" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const deleteImage = async (req, res) => {};

module.exports = { getAllImage, getImageByName };
