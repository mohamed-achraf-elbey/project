const express = require("express");
const router = express.Router();
const User = require("../modelss/customersShema");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");




var { requireAuth } = require("../Middleware/authMiddleware");
const { checkIfUser } = require("../Middleware/authMiddleware")

// ================= Routes =================

// صفحات عامة
router.get("/", authController.get_welcome);

router.get("/login", authController.get_login);

router.get("/signup", authController.get_signup);

// تسجيل حساب

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  authController.post_signup
);

// تسجيل الدخول
router.post("/login", authController.post_login);

// لازم يجي بعد login/signup
router.use(checkIfUser);

// ================= Routes محمية =================


router.get("/signout", authController.get_signout);

//******************************************** */

router.get("/home", requireAuth, userController.user_index_get);
router.get("/view/:id", requireAuth, userController.user_view_get);
router.get("/edit/:id", requireAuth, userController.user_edit_get);

router.post("/search", requireAuth, userController.user_search_post);
router.delete("/edit/:id", requireAuth, userController.user_delete);
router.put("/edit/:id", requireAuth, userController.user_put);

// تسجيل الخروج
router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

module.exports = router;
