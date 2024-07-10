const express = require("express");
const {
  getAllImage,
  getImageByName,
  deleteImage,
} = require("../controllers/images");

const router = express.Router();

// router.post("/");
router.get("/", getAllImage);
router.get("/:filename", getImageByName);
// router.put("/:id");
// router.delete("/:id");

module.exports = router;
