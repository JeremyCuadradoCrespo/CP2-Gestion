import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "ContactFlow V1 API" });
});

app.use("/api/contacts", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Recurso no encontrado" });
});

app.use((error, req, res, next) => {
  console.error("[app] Error no controlado:", error.message);
  res.status(500).json({ success: false, message: "Error interno del servidor" });
});

export default app;
