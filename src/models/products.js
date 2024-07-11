const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  category_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Product category does not exist"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    default: 0,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  image: {
    _id: Schema.Types.ObjectId,
    url: String,
  },
  quantitySold: {
    type: Number,
    default: 0,
  },
});

const Product = model("Products", ProductSchema);

module.exports = Product;
