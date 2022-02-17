const express = require("express");
const app = express();
app.use(express.json());

console.log("Express is running");

const users = [];

app.get("/user", (req, res) => {
  res.send(users);
});

app.post("/user", (req, res) => {
  const user = { name: req.body.name, work: req.body.work };
  users.push(user)
  res.send(users);
});

module.exports = app;
