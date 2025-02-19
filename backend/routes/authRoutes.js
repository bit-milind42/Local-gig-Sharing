const express = require("express");
// const { register, login } = require("../controllers/authController");
const { register, login, verifyToken, getProfile } = require("../controllers/authController");

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
