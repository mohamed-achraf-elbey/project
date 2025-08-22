const express = require('express')
const router = express.Router()
const User = require("../modelss/customersShema");
const userController = require("../controllers/userController");

router.get("/add.html", userController.user_add_get);


  router.post("/add.html", userController.usr_post);

    

module.exports = router 