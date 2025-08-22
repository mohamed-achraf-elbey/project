const express = require('express')
const router = express.Router()
const User = require("../modelss/customersShema");
const userController = require("../controllers/userController");

//res home page 
router.get("/", userController.user_index_get);
  //this first 

  //requst for varibles 
  router.get("/view/:id", userController.user_view_get);
  
  //edit
  router.get("/edit/:id", userController.user_edit_get);
  
  //Post Requst

  router.post("/search", userController.user_search_post);
  
  //Delete Requst 
  router.delete("/edit/:id", userController.user_delete);
  
  //Put Requst 
  router.put("/edit/:id", userController.user_put);
  
  

module.exports = router
