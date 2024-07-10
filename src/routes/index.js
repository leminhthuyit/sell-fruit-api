const express = require("express");
const productRoutes = require("./products");
const categoryRouter = require("./categories");
const imagesRouter = require("./images");

const router = express.Router();

// route con
router.use("/products", productRoutes);
router.use("/categories", categoryRouter);
router.use("/images", imagesRouter);

module.exports = router;
