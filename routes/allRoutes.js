const express = require('express')
const router = express.Router()
const User = require("../modelss/customersShema");

//res home page 
router.get("/", (req, res) => {
    User.find().then((result) => {
      // console.log(result)
      res.render("index", { result })
  
    }).catch((err) => {
      console.log(err)
    })
  });
  //this first 

  
  //requst for varibles 
  router.get("/view/:id", (req, res) => {
    User.findById(req.params.id)
      .then((result) => {
        if (!result) {
          return res.status(404).send("User not found");
        }
        // Render and pass user data
        res.render("user/view", { user: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Server Error");
      });
  });
  
  //edit
  router.get("/edit/:id", (req, res) => {
    User.findById(req.params.id).then((result) => {
      if (!result) {
        return res.status(404).send("User not found");
      }
      res.render("user/edit", { user: result });
    }).catch((err) => {
      console.error(err);
      res.status(500).send("serveur error");
    })
  
  });
  
  //Post Requst

  
  router.post("/search", (req, res) => {
    const keyword = req.body.name.trim(); 
  
    User.find({
      $or: [
        { First_Name: { $regex: keyword, $options: "i" } }, 
        { Last_Name: { $regex: keyword, $options: "i" } },  
        { Country: { $regex: keyword, $options: "i" } }    
      ]
    })
      .then(result => {
        //console.log(result);
          res.render("user/search", { result }); 
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error searching user");
      });
  });
  
  //Delete Requst 
  router.delete("/edit/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id).then((result) => { //User.DeletOne({_id : req.parms.id})
      if (!result)
        console.log("user no defind");
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.status(500).send("user no deleted");
    })
  });
  
  //Put Requst 
  router.put("/edit/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body) // or findByIdAndUpdate(req.params.id,req.body)
      .then((result) => {
        if (result.matchedCount === 0) {
          return res.status(404).send("User not found");
        }
        res.redirect("/");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Failed to update user");
      });
  });
  
  

module.exports = router
