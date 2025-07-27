// backend/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/payment", paymentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Razorpay backend running at http://localhost:${PORT}`);
});
