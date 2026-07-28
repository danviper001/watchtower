import express from "express";
import cors from "cors";
import incidentRoutes from "./routes/incidentRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import authRoutes from "./routes/authRoutes";
import responderRoutes from "./routes/responderRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/responder", responderRoutes);
app.get("/", (_, res) => {
  res.send("🚀 WatchTower API is running");
});

export default app;