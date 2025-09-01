const express = require('express')
const router = express.Router()
const User = require("../modelss/customersShema");
const userController = require("../controllers/userController");
const {requireAuth} = require("../Middleware/authMiddleware")



router.get("/add.html",requireAuth, userController.user_add_get);




  router.post("/add.html",requireAuth ,userController.usr_post);

    

module.exports = router 