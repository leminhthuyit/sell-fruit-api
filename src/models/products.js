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
  supplier_id: {
    type: Number,
    required: [true, "product supplier does not exist"],
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
  imageUrl: String,
});

const Product = model("Products", ProductSchema);

module.exports = Product;
