const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/products/:id", (req, res) => {
  const product = {
    id: req.params.id,
    title: "modified product title " + req.params.id,
    description: "product description " + req.params.id,
  };
  res.send(product);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
