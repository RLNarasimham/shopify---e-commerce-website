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
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

// --- Helper: require env at startup (fixes TS2345 and fails fast if missing)
function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
}

// ✅ Read and freeze envs as real strings
const RAZORPAY_KEY_ID = requireEnv("RAZORPAY_KEY_ID");
const RAZORPAY_KEY_SECRET = requireEnv("RAZORPAY_KEY_SECRET");

const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Replace with domain for production
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// app.post("/api/payment/create-order", async (req, res) => {
//   try {
//     const { amount, currency = "INR", receipt, notes } = req.body;

//     // amount must be in paise (₹1 = 100)
//     if (!amount || amount < 100) {
//       return res.status(400).json({ error: "Invalid amount (min ₹1.00)" });
//     }

//     const order = await razorpay.orders.create({
//       amount, // paise
//       currency,
//       receipt: receipt || `rcpt_${Date.now()}`,
//       notes: req.body.notes || {},
//     });

//     res.json({ success: true, order });
//   } catch (e) {
//     console.error("Create order error:", e);
//     res.status(500).json({ error: "Order creation failed" });
//   }
// });

// Create order (amount in paise)
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const {
      amount,
      currency = "INR",
      receipt,
      notes,
    } = req.body as {
      amount: number;
      currency?: "INR";
      receipt?: string;
      notes?: Record<string, unknown>;
    };
    if (!amount || amount < 100) {
      return res.status(400).json({ error: "Invalid amount (min ₹1.00)" });
    }
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt ?? `rcpt_${Date.now()}`,
      notes,
    });
    res.json({ success: true, order });
  } catch (e) {
    console.error("Create order error:", e);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// app.post("/api/payment/verify", (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     const sign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (sign === razorpay_signature) {
//       // TODO: Mark order as paid in DB, fulfill, send email, etc.
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
      return res.json({ success: true });
    }
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
