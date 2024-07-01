const express = require("express");
const app = express();
const port = 8080;

const data = {
  id: 1,
  name: "Tuan anh",
  age: "20",
  add: "Viet nam",
};

app.get("/", (req, res) => {
  const a = 1;
  const b = 2;

  const c = a + b;

  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});
