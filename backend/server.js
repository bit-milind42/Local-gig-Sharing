// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// // const gigRoutes = require('./routes/gigRoutes');
// const gigRoutes = require('./routes/gigRoutes')
// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use('/api/gigs', gigRoutes);

// // Database Connection
// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Connected to MongoDB");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));



const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const gigRoutes = require('./routes/gigRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/gigs', gigRoutes);

// 404 handler
app.use((req, res, next) => {
    console.log(`404: ${req.method} ${req.path}`);
    res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Database Connection
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));