const http = require('http');
const { Server } = require('socket.io');
const app = require('./app'); // Your Express app

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => console.log('A user disconnected'));
});

module.exports = { io, server };
