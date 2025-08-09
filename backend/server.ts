// // backend/server.ts
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import paymentRoutes from "./routes/paymentRoutes";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Use routes
// app.use("/api/payment", paymentRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Razorpay backend running at http://localhost:${PORT}`);
// });


// backend/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS config
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Replace with domain for production
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

// ✅ Routes
app.use("/api/payment", paymentRoutes);

// ✅ Health Check
app.get("/", (_req, res) => {
  res.send("🚀 Razorpay backend is live!");
});

// ✅ Start server - 0.0.0.0 makes it globally accessible
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`✅ Backend running at http://0.0.0.0:${PORT}`);
});
