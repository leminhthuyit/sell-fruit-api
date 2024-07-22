const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const imageSchema = Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
});

const Image = model("Image", imageSchema);

module.exports = Image;
