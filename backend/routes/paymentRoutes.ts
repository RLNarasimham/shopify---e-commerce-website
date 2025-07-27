// backend/routes/paymentRoutes.ts
import { razorpay } from "../config/razorpay";
import express from "express";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

export default router;
