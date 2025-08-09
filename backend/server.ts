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
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import paymentRoutes from "./routes/paymentRoutes";

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Global CORS configuration for any network access
// const corsOptions = {
//   origin: function (origin: string | undefined, callback: Function) {
//     // Allow requests with no origin (mobile apps, desktop apps, etc.)
//     if (!origin) return callback(null, true);

//     // Allow all origins in development
//     if (process.env.NODE_ENV === "development") {
//       return callback(null, true);
//     }

//     // In production, you can specify allowed origins
//     const allowedOrigins = [
//       "http://localhost:3000",
//       "http://localhost:5173",
//       "http://localhost:4173",
//       process.env.FRONTEND_URL,
//       // Add your production URLs here
//     ].filter(Boolean);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(null, true); // Allow all for now, restrict in production
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Origin",
//     "X-Requested-With",
//     "Accept",
//   ],
// };

// // Middleware
// app.use(cors(corsOptions));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   console.log("Request body:", req.body);
//   next();
// });

// // Health check endpoint
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "E-commerce Backend API is running",
//     timestamp: new Date().toISOString(),
//     version: "1.0.0",
//   });
// });

// app.get("/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "Server is healthy",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   });
// });

// // API Routes
// app.use("/api/payment", paymentRoutes);

// // Error handling middleware
// app.use(
//   (
//     err: any,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     console.error("Server Error:", err);

//     res.status(err.status || 500).json({
//       success: false,
//       error: err.message || "Internal Server Error",
//       ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//     });
//   }
// );

// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     error: "Route not found",
//     path: req.originalUrl,
//     method: req.method,
//   });
// });

// // Start server
// const server = app.listen(PORT, "0.0.0.0", () => {
//   console.log("\n🚀 Server Configuration:");
//   console.log(`   • Port: ${PORT}`);
//   console.log(`   • Environment: ${process.env.NODE_ENV || "development"}`);
//   console.log(
//     `   • Razorpay Key ID: ${
//       process.env.RAZORPAY_KEY_ID ? "✅ Configured" : "❌ Missing"
//     }`
//   );
//   console.log(`   • Server URL: http://localhost:${PORT}`);
//   console.log("\n📡 Available Endpoints:");
//   console.log(`   • GET  http://localhost:${PORT}/health`);
//   console.log(`   • POST http://localhost:${PORT}/api/payment/create-order`);
//   console.log(`   • POST http://localhost:${PORT}/api/payment/verify`);
//   console.log(
//     "\n🌐 Server is accessible from any network interface (0.0.0.0)\n"
//   );
// });

// // Graceful shutdown
// process.on("SIGTERM", () => {
//   console.log("SIGTERM received, shutting down gracefully");
//   server.close(() => {
//     console.log("Process terminated");
//   });
// });

// process.on("SIGINT", () => {
//   console.log("SIGINT received, shutting down gracefully");
//   server.close(() => {
//     console.log("Process terminated");
//   });
// });

// export default app;

// backend/app.ts or backend/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { networkInterfaces } from "os";
import paymentRoutes from "./routes/paymentRoutes";

// Load environment variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get network interfaces to display all available IPs
const getNetworkIPs = () => {
  const nets = networkInterfaces();
  const results: string[] = [];

  for (const name of Object.keys(nets)) {
    const net = nets[name];
    if (net) {
      for (const netInfo of net) {
        if (netInfo.family === "IPv4" && !netInfo.internal) {
          results.push(netInfo.address);
        }
      }
    }
  }
  return results;
};

// Enhanced CORS configuration for global access
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Allow all origins for maximum compatibility
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
    "Access-Control-Allow-Headers",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

// Apply CORS globally
app.use(cors(corsOptions));

// Middleware for parsing requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Additional headers for maximum compatibility
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Enhanced request logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`\n📡 [${timestamp}] ${method} ${url}`);
  console.log(`🌍 Client IP: ${ip}`);

  if (Object.keys(req.body).length > 0) {
    console.log(`📝 Request body:`, JSON.stringify(req.body, null, 2));
  }

  if (Object.keys(req.query).length > 0) {
    console.log(`🔍 Query params:`, req.query);
  }

  next();
});

// Root endpoint with comprehensive info
app.get("/", (req, res) => {
  const networkIPs = getNetworkIPs();

  res.json({
    success: true,
    message: "E-commerce Backend API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    port: PORT,
    networkAccess: {
      localhost: `http://localhost:${PORT}`,
      networkIPs: networkIPs.map((ip) => `http://${ip}:${PORT}`),
      note: "Server is accessible from any network interface",
    },
    endpoints: {
      health: "/health",
      paymentHealth: "/api/payment/health",
      createOrder: "/api/payment/create-order",
      verifyPayment: "/api/payment/verify",
      testRazorpay: "/api/payment/test",
    },
    configuration: {
      razorpayConfigured: !!(
        process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
      ),
      razorpayKeyId: process.env.RAZORPAY_KEY_ID
        ? `${process.env.RAZORPAY_KEY_ID.substring(0, 8)}...`
        : "Not configured",
    },
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      formatted: `${Math.floor(uptime / 3600)}h ${Math.floor(
        (uptime % 3600) / 60
      )}m ${Math.floor(uptime % 60)}s`,
    },
    memory: {
      used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
    },
    razorpayStatus: !!(
      process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    )
      ? "Configured"
      : "Not configured",
  });
});

// API Routes
app.use("/api/payment", paymentRoutes);

// Global error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("\n❌ Server Error:");
    console.error("URL:", req.originalUrl);
    console.error("Method:", req.method);
    console.error("Error:", err);
    console.error("Stack:", err.stack);

    res.status(err.status || 500).json({
      success: false,
      error: err.message || "Internal Server Error",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
        details: err,
      }),
    });
  }
);

// 404 handler with helpful information
app.use("*", (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);

  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      "GET /",
      "GET /health",
      "GET /api/payment/health",
      "POST /api/payment/create-order",
      "POST /api/payment/verify",
      "GET /api/payment/test",
    ],
    hint: "Check the available endpoints above",
  });
});

// Start server on all network interfaces (0.0.0.0)
const server = app.listen(PORT, "0.0.0.0", () => {
  const networkIPs = getNetworkIPs();

  console.log("\n🚀 ================================");
  console.log("   E-COMMERCE BACKEND STARTED");
  console.log("🚀 ================================");
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔧 Port: ${PORT}`);
  console.log(`⏰ Started: ${new Date().toLocaleString()}`);

  console.log("\n🌐 SERVER ACCESSIBLE FROM:");
  console.log(`   📍 Localhost: http://localhost:${PORT}`);

  if (networkIPs.length > 0) {
    console.log("   📍 Network IPs:");
    networkIPs.forEach((ip) => {
      console.log(`      • http://${ip}:${PORT}`);
    });
  }

  console.log("\n🔗 API ENDPOINTS:");
  console.log(`   ✅ Health: http://localhost:${PORT}/health`);
  console.log(
    `   💳 Create Order: http://localhost:${PORT}/api/payment/create-order`
  );
  console.log(
    `   🔐 Verify Payment: http://localhost:${PORT}/api/payment/verify`
  );
  console.log(`   🧪 Test Razorpay: http://localhost:${PORT}/api/payment/test`);

  console.log("\n⚙️  CONFIGURATION:");
  console.log(
    `   💳 Razorpay Key ID: ${
      process.env.RAZORPAY_KEY_ID
        ? "✅ " + process.env.RAZORPAY_KEY_ID.substring(0, 12) + "..."
        : "❌ Not configured"
    }`
  );
  console.log(
    `   🔐 Razorpay Secret: ${
      process.env.RAZORPAY_KEY_SECRET ? "✅ Configured" : "❌ Not configured"
    }`
  );

  console.log("\n📱 DEVICE ACCESS:");
  console.log("   • Server accepts connections from ANY device on the network");
  console.log("   • Mobile apps, web browsers, and API clients can connect");
  console.log("   • CORS is configured to allow all origins");

  if (networkIPs.length > 0) {
    console.log("\n🔧 TO ACCESS FROM OTHER DEVICES:");
    console.log(`   1. Use any of the network IP addresses above`);
    console.log(`   2. Ensure firewall allows connections on port ${PORT}`);
    console.log(
      `   3. Update your frontend VITE_BACKEND_URL to use the network IP`
    );
  }

  console.log("\n🚀 ================================\n");
});

// Enhanced graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`\n📡 ${signal} received, shutting down gracefully...`);

  server.close((err) => {
    if (err) {
      console.error("❌ Error during server shutdown:", err);
      process.exit(1);
    }

    console.log("✅ Server shut down successfully");
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error("⏰ Forced shutdown after 30 seconds");
    process.exit(1);
  }, 30000);
};

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

export default app;
