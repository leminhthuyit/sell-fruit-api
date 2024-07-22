const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const saleSchema = {
  discount: { type: Number },
  starDate: { type: Date },
  endDate: { type: Date },
};

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
  rate: {
    type: Number,
    default: 0,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  isSale: {
    type: Boolean,
    required: [true, "Please select product price"],
    default: false,
  },
  sale: { type: saleSchema, default: null },
  createTime: {
    type: Date,
    default: Date.now(),
  },
});

// ProductSchema.pre("save", (next) => {
//   if (!this.createTime) {
//     this.createTime = new Date();
//   }
//   next();
// });

const Product = model("Products", ProductSchema);

module.exports = Product;
