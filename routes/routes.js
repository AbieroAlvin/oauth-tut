const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/auth/google", authController.googleAuth);

router.get(
  "/auth/google/callback",
  authController.googleAuthCallback,
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/protected", authController.protectedRoute);

module.exports = router;
