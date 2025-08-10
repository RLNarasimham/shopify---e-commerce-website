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
// import express from "express";
// import cors from "cors";
// import Razorpay from "razorpay";
// import dotenv from "dotenv";
// import crypto from "crypto";
// import paymentRoutes from "./routes/paymentRoutes";

// // Allow only your frontend domain in production, plus localhost in dev
// const allowedOrigins = [
//   process.env.FRONTEND_URL || "", // e.g., https://shopify-frontend.onrender.com
//   "http://localhost:5173", // Vite dev server
// ];

// dotenv.config();

// // --- Helper: require env at startup (fixes TS2345 and fails fast if missing)
// function requireEnv(name: string): string {
//   const v = process.env[name];
//   if (!v) throw new Error(`Missing required environment variable: ${name}`);
//   return v;
// }

// // ✅ Read and freeze envs as real strings
// // const RAZORPAY_KEY_ID = requireEnv("RAZORPAY_KEY_ID");
// // const RAZORPAY_KEY_SECRET = requireEnv("RAZORPAY_KEY_SECRET");
// console.log(process.env.RAZORPAY_KEY_ID);

// const app = express();

// // ✅ CORS config
// // app.use(
// //   cors({
// //     origin: process.env.FRONTEND_URL || "*", // Replace with domain for production
// //     methods: ["GET", "POST"],
// //     credentials: true,
// //   })
// // );

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // allow requests with no origin (like mobile apps or curl)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error("CORS: Origin not allowed"));
//     },
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// const razorpay = new Razorpay({
//   key_id: RAZORPAY_KEY_ID,
//   key_secret: RAZORPAY_KEY_SECRET,
// });

// // app.post("/api/payment/create-order", async (req, res) => {
// //   try {
// //     const { amount, currency = "INR", receipt, notes } = req.body;

// //     // amount must be in paise (₹1 = 100)
// //     if (!amount || amount < 100) {
// //       return res.status(400).json({ error: "Invalid amount (min ₹1.00)" });
// //     }

// //     const order = await razorpay.orders.create({
// //       amount, // paise
// //       currency,
// //       receipt: receipt || `rcpt_${Date.now()}`,
// //       notes: req.body.notes || {},
// //     });

// //     res.json({ success: true, order });
// //   } catch (e) {
// //     console.error("Create order error:", e);
// //     res.status(500).json({ error: "Order creation failed" });
// //   }
// // });

// // Create order (amount in paise)
// app.post("/api/payment/create-order", async (req, res) => {
//   try {
//     const {
//       amount,
//       currency = "INR",
//       receipt,
//       notes,
//     } = req.body as {
//       amount: number;
//       currency?: "INR";
//       receipt?: string;
//       notes?: Record<string, unknown>;
//     };
//     if (!amount || amount < 100) {
//       return res.status(400).json({ error: "Invalid amount (min ₹1.00)" });
//     }
//     const order = await razorpay.orders.create({
//       amount,
//       currency,
//       receipt: receipt ?? `rcpt_${Date.now()}`,
//     });
//     res.json({ success: true, order });
//   } catch (e) {
//     console.error("Create order error:", e);
//     res.status(500).json({ error: "Order creation failed" });
//   }
// });

// // app.post("/api/payment/verify", (req, res) => {
// //   try {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
// //       req.body;

// //     const sign = crypto
// //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
// //       .digest("hex");

// //     if (sign === razorpay_signature) {
// //       // TODO: Mark order as paid in DB, fulfill, send email, etc.
// //       return res.json({ success: true });
// //     }
// //     return res
// //       .status(400)
// //       .json({ success: false, error: "Signature mismatch" });
// //   } catch (e) {
// //     console.error("Verify error:", e);
// //     res.status(500).json({ error: "Verification failed" });
// //   }
// // });

// app.post("/api/payment/verify", (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body as {
//         razorpay_order_id: string;
//         razorpay_payment_id: string;
//         razorpay_signature: string;
//       };

//     // ✅ TS-safe: RAZORPAY_KEY_SECRET is a guaranteed string
//     // const expected = crypto
//     //   .createHmac("sha256", RAZORPAY_KEY_SECRET)
//     //   .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     //   .digest("hex");

//     const secret = process.env.RAZORPAY_KEY_SECRET;
//     if (!secret) throw new Error("Missing RAZORPAY_KEY_SECRET");
//     const expected = crypto
//       .createHmac("sha256", secret)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (expected === razorpay_signature) {
//       return res.json({ success: true });
//     }
//     return res
//       .status(400)
//       .json({ success: false, error: "Signature mismatch" });
//   } catch (e) {
//     console.error("Verify error:", e);
//     res.status(500).json({ error: "Verification failed" });
//   }
// });

// const PORT = process.env.PORT || 5000;

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

// backend/server.ts
import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import paymentRoutes from "./routes/paymentRoutes";

// ✅ Load environment variables FIRST
dotenv.config();

// ✅ Debug: Check if env vars are loaded
console.log("🔍 Environment Check:");
console.log(
  "RAZORPAY_KEY_ID:",
  process.env.RAZORPAY_KEY_ID ? "Found" : "Missing"
);
console.log(
  "RAZORPAY_KEY_SECRET:",
  process.env.RAZORPAY_KEY_SECRET ? "Found" : "Missing"
);

// --- Helper: require env at startup (fixes TS2345 and fails fast if missing)
function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
}

// ✅ Read and freeze envs as real strings
const RAZORPAY_KEY_ID = requireEnv("RAZORPAY_KEY_ID");
const RAZORPAY_KEY_SECRET = requireEnv("RAZORPAY_KEY_SECRET");

// Allow only your frontend domain in production, plus localhost in dev
const allowedOrigins = [
  process.env.FRONTEND_URL || "", // e.g., https://shopify-frontend.onrender.com
  "http://localhost:5173", // Vite dev server
];

const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS: Origin not allowed"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Initialize Razorpay with the validated environment variables
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

console.log("✅ Razorpay initialized successfully");

// Create order (amount in paise)
// app.post("/api/payment/create-order", async (req, res) => {
//   try {
//     const {
//       amount,
//       currency = "INR",
//       receipt,
//       notes,
//     } = req.body as {
//       amount: number;
//       currency?: "INR";
//       receipt?: string;
//       notes?: Record<string, unknown>;
//     };

//     if (!amount || amount < 100) {
//       return res.status(400).json({ error: "Invalid amount (min ₹1.00)" });
//     }

//     const order = await razorpay.orders.create({
//       amount,
//       currency,
//       receipt: receipt ?? `rcpt_${Date.now()}`,
//       notes,
//     });

//     res.json({ success: true, order });
//   } catch (e) {
//     console.error("Create order error:", e);
//     res.status(500).json({ error: "Order creation failed" });
//   }
// });

app.post("/api/payment/create-order", async (req, res) => {
  try {
    // ✅ Debug: Log everything about the incoming request
    console.log("🔍 Backend Debug Info:");
    console.log("=".repeat(50));
    console.log("📥 Incoming Request:");
    console.log("- Method:", req.method);
    console.log("- URL:", req.url);
    console.log("- Content-Type:", req.headers["content-type"]);
    console.log(
      "- Authorization:",
      req.headers.authorization ? "Present" : "Missing"
    );
    console.log("- Origin:", req.headers.origin);
    console.log(
      "- User-Agent:",
      req.headers["user-agent"]?.substring(0, 50) + "..."
    );

    console.log("📦 Request Body:");
    console.log("- Raw body:", JSON.stringify(req.body, null, 2));
    console.log("- Body type:", typeof req.body);
    console.log("- Body keys:", Object.keys(req.body || {}));

    const {
      amount,
      currency = "INR",
      receipt,
      notes,
      items,
      shipping,
    } = req.body as {
      amount: number;
      currency?: "INR";
      receipt?: string;
      notes?: Record<string, unknown>;
      items?: any[];
      shipping?: any;
    };

    // ✅ Debug: Log extracted and processed values
    console.log("📊 Extracted Values:");
    console.log(
      "- amount:",
      amount,
      "(type:",
      typeof amount,
      ", isNaN:",
      isNaN(amount),
      ")"
    );
    console.log("- currency:", currency);
    console.log("- receipt:", receipt);
    console.log("- notes:", notes);
    console.log(
      "- items:",
      items ? `Array of ${items.length} items` : "Not provided"
    );
    console.log("- shipping:", shipping ? "Object provided" : "Not provided");

    // ✅ Enhanced validation with detailed logging
    if (!amount) {
      console.error("❌ Validation Failed: Amount is missing or falsy");
      console.error("- Received amount:", amount);
      console.error("- Amount type:", typeof amount);
      return res.status(400).json({
        success: false,
        error: "Amount is required",
        debug: {
          received: amount,
          type: typeof amount,
          isNumber: typeof amount === "number",
          isNaN: isNaN(amount),
        },
      });
    }

    if (typeof amount !== "number" || isNaN(amount)) {
      console.error("❌ Validation Failed: Amount is not a valid number");
      console.error("- Received amount:", amount);
      console.error("- Amount type:", typeof amount);
      return res.status(400).json({
        success: false,
        error: "Amount must be a valid number",
        debug: {
          received: amount,
          type: typeof amount,
          isNaN: isNaN(amount),
        },
      });
    }

    if (amount < 100) {
      console.error("❌ Validation Failed: Amount too small");
      console.error("- Received amount:", amount, "(minimum required: 100)");
      return res.status(400).json({
        success: false,
        error: "Invalid amount (minimum ₹1.00 = 100 paise)",
        debug: {
          received: amount,
          minimum: 100,
        },
      });
    }

    console.log("✅ Validation Passed!");
    console.log("- Final amount for Razorpay:", amount, "paise");

    // Create Razorpay order
    const orderData = {
      amount: amount, // amount should already be in paise from frontend
      currency,
      receipt: receipt ?? `rcpt_${Date.now()}`,
      notes: {
        ...notes,
        itemCount: items?.length || 0,
        customerEmail: shipping?.email || "guest",
        timestamp: new Date().toISOString(),
      },
    };

    console.log("📝 Creating Razorpay order with data:");
    console.log(JSON.stringify(orderData, null, 2));

    const order = await razorpay.orders.create(orderData);

    console.log("✅ Razorpay Order Created Successfully:");
    console.log("- Order ID:", order.id);
    console.log("- Amount:", order.amount);
    console.log("- Currency:", order.currency);
    console.log("- Status:", order.status);
    console.log("- Receipt:", order.receipt);

    const response = {
      success: true,
      order: order,
      // Additional fields for frontend compatibility
      id: order.id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    };

    console.log("📤 Sending Response:");
    console.log(JSON.stringify(response, null, 2));
    console.log("=".repeat(50));

    res.json(response);
  } catch (e) {
    console.error("❌ Create Order Error:");
    console.error("- Error type:", e?.constructor?.name);
    console.error("- Error message:", (e as Error).message);
    console.error("- Error stack:", (e as Error).stack);
    console.error("=".repeat(50));

    res.status(500).json({
      success: false,
      error: "Order creation failed",
      debug:
        process.env.NODE_ENV === "development"
          ? (e as Error).message
          : undefined,
    });
  }
});

// Verify payment
app.post("/api/payment/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body as {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      };

    // ✅ TS-safe: RAZORPAY_KEY_SECRET is a guaranteed string
    const expected = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected === razorpay_signature) {
      console.log("✅ Payment verified successfully");
      return res.json({ success: true });
    }

    console.log("❌ Payment verification failed - signature mismatch");
    return res
      .status(400)
      .json({ success: false, error: "Signature mismatch" });
  } catch (e) {
    console.error("Verify error:", e);
    res.status(500).json({ error: "Verification failed" });
  }
});

const PORT = process.env.PORT || 5000;

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
