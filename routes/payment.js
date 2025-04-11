const express = require("express");
const router = express.Router();
const razorpay = require("../razorpay");
const crypto = require("crypto");

router.post("/create-order", async (req, res) => {
  const { price } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: price * 100, 
      currency: "INR",
      receipt: "receipt#1",
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

router.post("/payment", (req, res) => {
  const price = Number(req.body.price);
  const key_id = process.env.RAZORPAY_KEY_ID; 

  res.render("buy/payment", { price, key_id });
});

module.exports = router;
