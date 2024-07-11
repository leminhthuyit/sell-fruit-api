const Category = require("../models/categories");
const Image = require("../models/image");

const ulrBase = process.env.URL_BASE || "http://localhost:8080";

const createCategory = async (req, res) => {
  try {
    const image = new Image({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });
    const saveImage = await image.save();

    const resultImg = {
      _id: saveImage._id,
      url: `${ulrBase}/api/images/${saveImage.filename}`,
    };

    const category = new Category({
      ...req.body,
      image: resultImg,
    });
    await category.save();
    res
      .status(200)
      .json({ message: "create category succeed!", data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(200).json({ data: categorys });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    res.status(200).json({ data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body);

    if (!category) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateCategory = await Product.findById(id);
    res.status(200).json({ data: updateCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
