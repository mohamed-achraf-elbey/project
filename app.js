  const express = require("express");
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const mongoose = require('mongoose');
  const User = require("./modelss/customersShema");
  app.set('view engine','ejs');
  app.use(express.static('public'));

  const livereload = require("livereload");
  const connectLivereload = require("connect-livereload");
  app.use(connectLivereload());

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(__dirname + "/views"); 
  liveReloadServer.watch(__dirname + "/public"); 

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  const users = [];
  const port = 3000 ;


  //res home page 
  app.get("/", (req, res) => {

    User.find().then((result) => {
      console.log(result)
      res.render("index" , {result} )
      
    }).catch((err) => {
      console.log(err)
    })
  });



  app.get("/user/add.html", (req, res) => {
    res.render("user/add" , {} )
  });
  app.get("/user/view.html", (req, res) => {
    res.render("user/view" , {} )
  });
  app.get("/user/edit.html", (req, res) => {
    res.render("user/edit" , {} )
  });
 /*app.get("/users", (request, response) => {
    if (users.length == 0) {
      response.status(404).send("No users found!");
      return;
    }
    response.status(200).send(users);
  });*/

  // POST - Create data
  /*app.post("/users", (request, response) => {
    console.log(request.body);
    const user = request.body;
    const findUser = users.find((x) => x.id === user.id);
    if (findUser) {
      response.status(400).send("User already exists");
      return;
    }
    users.push(user);
    response.status(201).send("Created!");
  });*/


  // DELETE - Remove data
 /* app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    const findUserIndex = users.findIndex((x) => x.id === id)
    if (findUserIndex == -1) {
      response.status(400).send("User not found!")
      return
    }
    users.splice(findUserIndex, 1)
    response.status(200).send("User deleted successfully!")
  })*/

  // PUT - Update user (partial update allowed)
  /*app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).send("User not found!");
    }

    users[index] = { ...users[index], ...updatedData };
    res.status(200).send("User updated successfully!");
  });*/
  


//Post Requst
  app.post("/user/add.html", (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save().then(result => {
      res.redirect("/");
    }).catch(err=> {
      console.log(err);
      res.status(500).send("Error saving user");
    })
    
  });








  //DB 
  mongoose.connect('mongodb+srv://achrafelbey07:kziD5aHx6YvEfwGF@cluster0.sgmbtel.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {

      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
      });

    })
    .catch((err) => { console.log(err) });

  ///////////
/*
  app.post("/home", (req, res) => {
    console.log(req.body);
    const myData = new MyData(req.body);
    myData.save().then(() => {
      res.redirect("/home");
    }).catch((err) => {
      console.log(err);
    });
  });*/
