const express = require("express");
const app = express();

app.use(express.json());
const mongoose = require('mongoose');

const users = [];

// HTTP METHODS
// GET - Retrive Data
app.get("/", (request, response) => {
  response.send("Welcome to home!");
});
//res home page 
app.get("/home" , (req,res) => {
  res.sendFile("./views/home.html", {root: __dirname})
});

app.get("/users", (request, response) => {
  if (users.length == 0) {
    response.status(404).send("No users found!");
    return;
  }
  response.status(200).send(users);
});

// POST - Create data
app.post("/users", (request, response) => {
  console.log(request.body);
  const user = request.body;
  const findUser = users.find((x) => x.id === user.id);
  if (findUser) {
    response.status(400).send("User already exists");
    return;
  }
  users.push(user); 
  response.status(201).send("Created!");
});


// DELETE - Remove data
app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    const findUserIndex = users.findIndex((x) => x.id === id)
    if(findUserIndex == -1) {
        response.status(400).send("User not found!")
        return
    }
    users.splice(findUserIndex, 1)
    response.status(200).send("User deleted successfully!")
})

// PUT - Update user (partial update allowed)
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).send("User not found!");
    }
  
    users[index] = { ...users[index], ...updatedData };
    res.status(200).send("User updated successfully!");
  });

  //DB 
  mongoose.connect('mongodb+srv://achrafelbey07:kziD5aHx6YvEfwGF@cluster0.sgmbtel.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
  .then(()=> {

    app.listen(3000, () => {
      console.log("Started on port 3000");
    });
    
  })
  .catch((err)=> {console.log(err)});
