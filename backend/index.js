const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
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
    for (const [uniqueId, socketId] of Object.entries(activeUsers)) {
      if (socketId === socket.id) {
        delete activeUsers[uniqueId];
        console.log(`User disconnected: ${uniqueId}`);
        break;
      }
    }
    console.log("Active users:", activeUsers);
  });

  socket.on("call-user", ({ targetId, offer }) => {
    const targetSocket = activeUsers[targetId];
    if (targetSocket) {
      io.to(targetSocket).emit("incoming-call", { from: socket.id, offer });
    } else {
      socket.emit("error", "User not available");
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
