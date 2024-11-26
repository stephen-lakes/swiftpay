const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("Home Route Accessed");
  res.send("Hello WOrld!");
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
