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

  socket.on("call-user", ({ targetId, offer, userId }) => {
    const targetSocket = activeUsers[targetId];

    if (targetSocket) {
      // Relay the offer to the target user
      io.to(targetSocket).emit("incoming-call", {
        from: userId, // Send the caller's user ID, not just socket ID
        socketId: socket.id, // Optionally include socket.id if needed
        offer, // WebRTC offer
      });
      console.log(
        `Incoming call sent to ${targetSocket} from userId: ${userId}`
      );
    } else {
      console.error("Target user not available to receive the offer.");
    }
  });

  socket.on("call-accepted", ({ targetId, answer }) => {
    console.log("Call accepted target (user ID):", targetId);

    // Lookup the actual socket ID of the target user
    const targetSocket = activeUsers[targetId];
    console.log("Resolved target socket:", targetSocket);

    if (targetSocket) {
      // Relay the answer back to the caller
      io.to(targetSocket).emit("call-answered", { answer });
      console.log(`Answer sent to socket ID: ${targetSocket}`);
    } else {
      console.error("Target user not available to receive the answer.");
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
