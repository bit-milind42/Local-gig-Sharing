// backend/socket.js
const { Server } = require("socket.io");
const http = require("http");
const app = require("./app"); // Ensure this points to your Express app

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust as per your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => console.log("A user disconnected"));
});

module.exports = { io, server };
