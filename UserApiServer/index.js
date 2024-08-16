const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let users = [];

app.get("/users", (req, res) => {
  res.json(users);
});
//using postman we can add, update,delete, get data
// {
//     "name": "John snow",
//     "gender": "male",
//     "dob": "1990-01-01",
//     "city": "New York",
//     "state": "NY",
//     "pincode": "11111"
// } in this formate we can add the data
//http://localhost:3000/users
app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  newUser.createdOn = new Date();
  newUser.modifiedOn = new Date();
  users.push(newUser);
  res.status(201).json(newUser);
});
//http://localhost:3000/users/1
app.put("/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const updateUser = req.body;
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    updateUser.id = userId;
    updateUser.modifiedOn = new Date();
    users[index] = updateUser;
    res.json(updateUser);
  } else {
    res.status(404).send("User not found");
  }
});
//http://localhost:3000/users/3

app.delete("/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  users = users.filter((user) => user.id !== userId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`User API server is running on http://localhost:${PORT}`);
});
