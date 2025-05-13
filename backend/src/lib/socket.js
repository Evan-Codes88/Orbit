import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      'https://orbit-chat.netlify.app',   // Frontend URL (Netlify)
      'https://orbit-lq87.onrender.com',   // Backend URL (Render)
    ],
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies)
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // Handle chat messages
  socket.on("sendMessage", async (message) => {
    try {
      const { receiverId, content } = message;
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", {
          senderId: userId,
          content,
          timestamp: new Date(),
        });
      }
      // Optionally save to MongoDB (handled in messageRoutes.js)
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });

  socket.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });
});

export { io, app, server };
