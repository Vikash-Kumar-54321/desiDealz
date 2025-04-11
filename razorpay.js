const Razorpay = require("razorpay");

const isLive = process.env.MODE === "LIVE";
const instance = new Razorpay({
  key_id: isLive ? process.env.RAZORPAY_LIVE_KEY_ID : process.env.RAZORPAY_TEST_KEY_ID,
  key_secret: isLive ? process.env.RAZORPAY_LIVE_SECRET : process.env.RAZORPAY_TEST_SECRET,
});


module.exports = instance;
