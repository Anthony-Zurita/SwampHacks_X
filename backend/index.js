const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
  },
});
const activeUsers = {};

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("register", (userId) => {
    activeUsers[userId] = socket.id;
    console.log(`User registered: ${userId}`);
    console.log("Active users:", activeUsers);
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of Object.entries(activeUsers)) {
      if (socketId === socket.id) {
        delete activeUsers[userId];
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
    console.log("Active users:", activeUsers);
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
