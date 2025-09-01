const User = require("../modelss/customersShema");
const AuthUser = require("../modelss/authShema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const get_welcome = (req, res) => {
    res.render("welcome");
  } ;

  const get_login =  (req, res) => {
    res.render("auth/login");
  };

  const get_signup = (req, res) => {
    res.render("auth/signup");
  };

  const post_signup = async (req, res) => {
    try {
      const objError = validationResult(req);

      if (objError.errors.length > 0) {
        return res.json({ arrValidationError: objError.errors })
      }

      const isCurrentEmail = await AuthUser.findOne({ email: req.body.email });
      console.log(isCurrentEmail);

      if (isCurrentEmail) {
        return res.json({ existEmail: "Email already exist" })
      }


      // create new user and login
      const newUser = await AuthUser.create(req.body);
      var token = jwt.sign({ id: newUser._id }, "c4a.dev");


      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ id: newUser._id })

    } catch (error) {
      console.log(error);
    }
  };

  const post_login = async (req, res) => {
    try {
      const loginUser = await AuthUser.findOne({ email: req.body.email });
  
      if (loginUser == null) {
        res.json({ notFoundEmail: "Email not found, try to sign up" });
      } else {
        const match = await bcrypt.compare(req.body.password, loginUser.password);
        if (match) {
            var token = jwt.sign({ id: loginUser._id }, "c4a.dev");
            res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
            res.json({ id: loginUser._id });
        } else {
          res.json({
            passwordError: `incorrect password for  ${req.body.email}`,
          });
        }
      }
  
  
  
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };

  const get_signout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/")
    
  };

  module.exports={
    get_login,
    get_signout,
    get_signup,
    get_welcome,
    post_login,
    post_signup,
  };