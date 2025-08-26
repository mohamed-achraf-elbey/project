const express = require("express");
const router = express.Router();
const User = require("../modelss/customersShema");
const AuthUser = require("../modelss/authShema");
const userController = require("../controllers/userController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requireAuth = require("../Middleware/authMiddleware");

// Middleware للتأكد إذا راهو user داخل
const checkIfUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || "c4a.dev", async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const loginUser = await AuthUser.findById(decoded.id);
        res.locals.user = loginUser;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// ================= Routes =================

// صفحات عامة
router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// تسجيل حساب
router.post("/signup", async (req, res) => {
  try {
    const result = await AuthUser.create(req.body);
    console.log("User created:", result);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });

    if (!loginUser) {
      return res.status(400).json({ error: "Email not found" });
    }

    const match = await bcrypt.compare(req.body.password, loginUser.password);

    if (match) {
      console.log("correct email and password");

      const token = jwt.sign(
        { id: loginUser._id },
        process.env.JWT_SECRET || "c4a.dev",
        { expiresIn: "1d" }
      );

      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.redirect("/home");
    } else {
      res.status(400).json({ error: "Wrong password" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// لازم يجي بعد login/signup
router.use(checkIfUser);

// ================= Routes محمية =================

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
