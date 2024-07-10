const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const connectDB = require("./configs/connect");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// connect DB
connectDB(process.env.MONGODB_URI);

// routes
app.use("/api", routes);

app.get("/", async (req, res) => {
  res.send("API Ecommerce");
});

module.exports = app;
