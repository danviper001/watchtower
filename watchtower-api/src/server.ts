import dotenv from "dotenv";
dotenv.config();

import http from "http";

import app from "./app";
import connectDB from "./config/database";
import { initSocket } from "./socket";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  initSocket(server);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();