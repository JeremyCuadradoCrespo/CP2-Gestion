import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5174";

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "ContactFlow V2 API Cambio realizado",
    }
  });
});

app.use("/api/contacts", contactRoutes);
app.use("/api/reports", reportRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Recurso no encontrado" });
});

app.use((error, req, res, next) => {
  console.error("[app] Error no controlado:", error.message);
  res.status(500).json({ success: false, message: "Error interno del servidor" });
});

export default app;
