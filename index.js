const dotenv = require("dotenv");
const app = require("./src/app");

dotenv.config();

const port = process.env.SERVER_PORT || 8080;

const startSever = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server start on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startSever();
