const Image = require("../models/image");
const Product = require("../models/products");
const dotenv = require("dotenv");
dotenv.config();

const ulrBase = process.env.URL_BASE || "https://sell-fruit-api.vercel.app";

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

    const parseSale = req.body.sale ? JSON.parse(req.body.sale) : null;

    const product = new Product({
      ...req.body,
      sale: parseSale,
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
  const { id } = req.params;

  const parseSale = req.body.sale ? JSON.parse(req.body.sale) : null;

  try {
    const product = await Product.findByIdAndUpdate(id, {
      ...req.body,
      sale: parseSale,
    });

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

const getSellingProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(8).sort({ quantitySold: -1 });
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrommotionProducts = async (req, res) => {
  try {
    const products = await Product.find({ isSale: true })
      .limit(6)
      .sort({ discount: -1 });
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSellingProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getPrommotionProducts,
};
