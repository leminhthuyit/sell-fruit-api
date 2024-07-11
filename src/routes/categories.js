const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const upload = require("../configs/storageEngine");

const router = express.Router();

router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
