// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authenticateUser = async (req, res, next) => {
//   const token = req.header('Authorization').split(" ")[1]

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }
//   console.log(token)
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     console.log(req.user)
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// module.exports = { authenticateUser };





// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authenticateUser = async (req, res, next) => {
//   const authHeader = req.header('Authorization');

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: 'No or invalid token provided' });
//   }

//   const token = authHeader.split(" ")[1]; // Safely extract token
//   console.log("Received Token:", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     console.log("Authenticated User:", req.user);
    
//     if (!req.user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error.message);
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// module.exports = { authenticateUser };






const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save to database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ success: true, user: savedUser, token });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerUser };
