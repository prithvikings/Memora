//backend/src/socket/socket.manager.js

import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

let ioInstance;

export const initSocket = (io) => {
  ioInstance = io;

  // Socket Authentication Middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      socket.userId = decoded.userId; // Attach user ID to the socket
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🔌 User ${socket.userId} connected on socket ${socket.id}`);

    // Join a personal "room" so we can easily emit to all of this specific user's devices
    socket.join(socket.userId);

    socket.on("disconnect", () => {
      console.log(`🔌 User ${socket.userId} disconnected`);
    });
  });
};

// Utility function to trigger events from anywhere in the backend (like our workers)
export const emitToUser = (userId, event, data) => {
  if (ioInstance) {
    ioInstance.to(userId.toString()).emit(event, data);
  }
};
