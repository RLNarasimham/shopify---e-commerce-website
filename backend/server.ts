// // // backend/server.ts
// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import paymentRoutes from "./routes/paymentRoutes";

// // dotenv.config();

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Use routes
// // app.use("/api/payment", paymentRoutes);

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Razorpay backend running at http://localhost:${PORT}`);
// // });

// // backend/server.ts
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import paymentRoutes from "./routes/paymentRoutes";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ CORS config
// app.use(cors({
//   origin: process.env.FRONTEND_URL || "*", // Replace with domain for production
//   methods: ["GET", "POST"],
//   credentials: true,
// }));

// app.use(express.json());

// // ✅ Routes
// app.use("/api/payment", paymentRoutes);

// // ✅ Health Check
// app.get("/", (_req, res) => {
//   res.send("🚀 Razorpay backend is live!");
// });

// // ✅ Start server - 0.0.0.0 makes it globally accessible
// app.listen(Number(PORT), "0.0.0.0", () => {
//   console.log(`✅ Backend running at http://0.0.0.0:${PORT}`);
// });

// backend/app.ts or backend/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global CORS configuration for any network access
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (mobile apps, desktop apps, etc.)
    if (!origin) return callback(null, true);

    // Allow all origins in development
    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    // In production, you can specify allowed origins
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.FRONTEND_URL,
      // Add your production URLs here
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now, restrict in production
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
  ],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Request body:", req.body);
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-commerce Backend API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/payment", paymentRoutes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Server Error:", err);

    res.status(err.status || 500).json({
      success: false,
      error: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Start server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("\n🚀 Server Configuration:");
  console.log(`   • Port: ${PORT}`);
  console.log(`   • Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `   • Razorpay Key ID: ${
      process.env.RAZORPAY_KEY_ID ? "✅ Configured" : "❌ Missing"
    }`
  );
  console.log(`   • Server URL: http://localhost:${PORT}`);
  console.log("\n📡 Available Endpoints:");
  console.log(`   • GET  http://localhost:${PORT}/health`);
  console.log(`   • POST http://localhost:${PORT}/api/payment/create-order`);
  console.log(`   • POST http://localhost:${PORT}/api/payment/verify`);
  console.log(
    "\n🌐 Server is accessible from any network interface (0.0.0.0)\n"
  );
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

export default app;
