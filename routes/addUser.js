const express = require('express')
const router = express.Router()
const User = require("../modelss/customersShema");

router.get("/add.html", (req, res) => {
    res.render("user/add", {})
  });


  router.post("/add.html", (req, res) => {
    //console.log(req.body);
    //const user = new User();
    User.create(req.body).then(result => {
      res.redirect("/");
    }).catch(err => {
      console.log(err);
      res.status(500).send("Error saving user");
    })
  
  });

    

module.exports = router 