const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
});

const Category = model("Categories", CategorySchema);

module.exports = Category;
