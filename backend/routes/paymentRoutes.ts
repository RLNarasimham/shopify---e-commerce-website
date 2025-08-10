import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

console.log(process.env.RAZORPAY_KEY_ID);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Payment service is running",
    timestamp: new Date().toISOString(),
  });
});

router.post("/create-order", async (req, res) => {
  try {
    console.log("📝 Creating Razorpay order...", req.body);

    const { amount, currency = "INR", userId, items } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid amount. Amount must be a positive number.",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: currency,
      receipt: `receipt_${userId || "guest"}_${Date.now()}`,
      notes: {
        userId: userId || "guest",
        itemCount: items?.length || 0,
        timestamp: new Date().toISOString(),
      },
    };

    const order = await razorpay.orders.create(options);

    console.log("✅ Razorpay order created:", order.id);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("❌ Razorpay order creation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Order creation failed",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

router.post("/orders", async (req, res) => {
  try {
    console.log("📝 Creating order via /orders endpoint...", req.body);

    const { amount, currency = "INR", userId, items } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid amount",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: currency,
      receipt: `order_${userId || "guest"}_${Date.now()}`,
      notes: {
        userId: userId || "guest",
        itemCount: items?.length || 0,
      },
    };

    const order = await razorpay.orders.create(options);

    console.log("✅ Order created:", order.id);

    res.status(200).json({
      success: true,
      order: order,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("❌ Order creation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Order creation failed",
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    console.log("🔐 Verifying payment...", req.body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing required payment verification parameters",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment verified successfully");

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });
    } else {
      console.log("❌ Payment verification failed - signature mismatch");

      res.status(400).json({
        success: false,
        error: "Payment verification failed",
      });
    }
  } catch (error: any) {
    console.error("❌ Payment verification error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Payment verification failed",
    });
  }
});

router.get("/payment/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await razorpay.payments.fetch(paymentId);

    res.status(200).json({
      success: true,
      payment: payment,
    });
  } catch (error: any) {
    console.error("❌ Error fetching payment:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch payment details",
    });
  }
});

router.get("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await razorpay.orders.fetch(orderId);

    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error: any) {
    console.error("❌ Error fetching order:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch order details",
    });
  }
});

export default router;
