const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

// User Routes
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);

module.exports = router;
