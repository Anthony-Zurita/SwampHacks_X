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

  // Register user
  socket.on("register", (userId) => {
    activeUsers[userId] = socket.id;
    console.log(`User registered: ${userId}`);
    console.log("Active users:", activeUsers);
  });

  // Handle disconnection
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

  // Handle call initiation
  socket.on("call-user", ({ targetId, offer, userId }) => {
    const targetSocket = activeUsers[targetId];
    if (targetSocket) {
      io.to(targetSocket).emit("incoming-call", {
        from: userId,
        socketId: socket.id,
        offer,
      });
      console.log(
        `Incoming call sent to ${targetSocket} from userId: ${userId}`
      );
    } else {
      console.error("Target user not available to receive the offer.");
    }
  });

  // Handle call acceptance
  socket.on("call-accepted", ({ targetId, answer }) => {
    const targetSocket = activeUsers[targetId];
    if (targetSocket) {
      io.to(targetSocket).emit("call-answered", { answer });
      console.log(`Answer sent to socket ID: ${targetSocket}`);
    } else {
      console.error("Target user not available to receive the answer.");
    }
  });

  // Handle ICE candidate exchange
  socket.on("ice-candidate", ({ targetId, candidate }) => {
    const targetSocket = activeUsers[targetId];
    if (targetSocket) {
      io.to(targetSocket).emit("ice-candidate", { candidate });
      console.log(`Relayed ICE candidate to ${targetId} successful`);
    } else {
      console.error(
        `Target user not found for ICE candidate relay: ${targetId}`
      );
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
