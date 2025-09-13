const express = require('express');
const { userAuth } = require('../middleware/auth');
const paymentRouter = express.Router();
const razorpayInstance = require('../utils/razorpay');
const Payment = require('../models/payment');
const { membershipAmount } = require('../utils/constants');
const {
  validateWebhookSignature,
} = require('razorpay/dist/utils/razorpay-utils');
const User = require('../models/user');
paymentRouter.post('/payment/create', userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: 'INR',
      receipt: 'receipt#1',
      partial_payment: false,
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });
    const savedPayment = await payment.save();
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// Add this route below your /payment/create
paymentRouter.post('/payment/capture', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ msg: 'Invalid payment signature!' });
    }

    const payment = await Payment.findOne({ orderId: razorpay_order_id });
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found!' });
    }

    payment.status = 'captured';
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    res.json({ msg: 'Payment captured successfully', payment });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

paymentRouter.post('/payment/webhook', async (req, res) => {
  try {
    const webhookSignature = req.get('X-Razorpay-Signature');

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(500).json({ msg: 'Webhook signature is invalid!' });
    }
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    return res.status(200).json({ msg: 'Webhook received successfully.' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
paymentRouter.get('/premium/verify', userAuth, async (req, res) => {
  try {
    const user = req.user.toJSON();
    return res.json({ ...user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = paymentRouter;
