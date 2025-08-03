// // backend/routes/paymentRoutes.ts
// import { razorpay } from "../config/razorpay";
// import express from "express";

// const router = express.Router();

// router.post("/create-order", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || isNaN(amount)) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     res.status(200).json(order);
//   } catch (error) {
//     console.error("Razorpay order creation error:", error);
//     res.status(500).json({ error: "Order creation failed" });
//   }
// });

// export default router;


// backend/routes/paymentRoutes.ts
import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Order Creation Route
router.post("/orders", async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Payment Verification (Optional)
router.post("/verify", (req, res) => {
  // Signature verification logic here
  res.send("Verify payment logic to be added.");
});

export default router;
