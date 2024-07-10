const mongoose = require("mongoose");

const connectDB = (uri) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
