const express = require("express");
// const { register, login } = require("../controllers/authController");
const { register, login, verifyToken, getProfile } = require("../controllers/authController");
const { signupUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const User = require("../models/User");

// Auth Routes
router.post("/register", register);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.post("/signup", signupUser);
// router.get("/me", getUser);


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "yourSecretKey", { expiresIn: "1h" });

        res.json({ token, user: { name: user.name, email: user.email } }); // ✅ Send user info
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

