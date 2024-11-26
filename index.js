const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("Home Route Accessed");
  res.send("Hello WOrld!");
});

// User Registration/Sign-up Endpoint
app.post("/users/register", () => {});

// User Login/Sing-in Endpoint
app.post("/users/login", () => {});

// User Endpoints
app.get("/users/balance", ()=>{})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port 3000`);
});
