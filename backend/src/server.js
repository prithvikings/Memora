import http from "http";
import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { Server } from "socket.io";
import { connectElasticsearch } from "./config/elasticsearch.js";

const startServer = async () => {
  // 1. Connect to Database
  await connectDB();
  await connectElasticsearch();

  // 2. Create HTTP Server
  const server = http.createServer(app);

  // 3. Initialize Socket.IO
  const io = new Server(server, {
    cors: { origin: "*" }, // Update for production
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  // Make 'io' accessible globally if needed, or pass it to a socket manager later
  app.set("io", io);

  // 4. Start Listening
  server.listen(env.PORT, () => {
    console.log(
      `🚀 API Server running in ${env.NODE_ENV} mode on port ${env.PORT}`,
    );
  });
};

startServer();
