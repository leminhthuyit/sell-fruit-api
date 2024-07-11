const Image = require("../models/image");
const Product = require("../models/products");

const ulrBase = process.env.URL_BASE || "http://localhost:8080";

const createProduct = async (req, res) => {
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

    const product = new Product({
      ...req.body,
      image: resultImg,
    });
    const saveProduct = await product.save();
    res
      .status(200)
      .json({ message: "create product succeed!", data: saveProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateProduct = await Product.findById(id);
    res.status(200).json({ data: updateProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
