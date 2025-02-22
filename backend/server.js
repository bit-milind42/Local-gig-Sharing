
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");

// const gigRoutes = require("./routes/gigRoutes");
// const connectDB = require('./config/db');

// connectDB(); 
// // Load environment variables
// dotenv.config();

// // Initialize app and server
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', require('./routes/authRoutes'));

// // Routes
// app.use("/api/gigs", gigRoutes);

// // MongoDB connection
// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => console.log("MongoDB connected"))
// // .catch((err) => console.error("MongoDB connection error:", err));

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error);
//     process.exit(1);
//   }
// };


// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = { app, io };
// module.exports = connectDB;




// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");
// const gigRoutes = require("./routes/gigRoutes");

// // Load environment variables
// dotenv.config();

// const connectDB = require('./config/db'); // Import connectDB

// // Connect to MongoDB
// connectDB();

// // Initialize app and server
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow frontend URL
//     credentials: true, // Allow cookies and authentication headers
//   })
// );

// mongoose.connect("mongodb://localhost:27017/localGigDB", { useNewUrlParser: true, useUnifiedTopology: true });
// app.use("/api/gigs", gigRoutes);
// app.listen(5000, () => console.log("Server running on port 5000"));

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use("/api/gigs", require("./routes/gigRoutes"));

// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

// module.exports = { app, io };






// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");

// // Load environment variables
// dotenv.config();

// const connectDB = require('./config/db'); // Import connectDB
// const gigRoutes = require("./routes/gigRoutes");
// const authRoutes = require("./routes/authRoutes");

// // Connect to MongoDB
// connectDB();

// // Initialize app and server
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Middleware
// app.use(cors({
//   origin: "http://localhost:5173", // Allow frontend URL
//   credentials: true, // Allow cookies and authentication headers
// }));
// app.use(express.json()); // Parse JSON data

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/gigs", gigRoutes);

// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

// mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/localGigDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// module.exports = { app, io };





const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const gigRoutes = require("./routes/gigRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const connectDB = require('./config/db');
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/gigs", gigRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = { app, io };
