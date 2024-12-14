const express = require("express");
const { Account, Transaction, User } = require("../db");
const { authMiddleware } = require("../middleware");
const { mongoose } = require("mongoose");
const { Resend } = require("resend");
const { date } = require("zod");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(411).json({
        message: "Insufficient Balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(411).json({
        message: "Invalid Account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    const transactionTime = account.updatedAt;
    const transactionTo = await User.findOne({ _id: to });
    const transactionFrom = await User.findOne({ _id: req.userId });

    await Transaction.updateOne(
      { userId: req.userId },
      { $push: { transactionTime: transactionTime } }
    );
    await Transaction.updateOne(
      { userId: req.userId },
      { $push: { transactionTo: transactionTo.firstName } }
    );
    await Transaction.updateOne(
      { userId: req.userId },
      { $push: { transactionAmount: amount } }
    );
    await Transaction.updateOne(
      { userId: req.userId },
      { $push: { transactionType: "Sent" } }
    );

    await Transaction.updateOne(
      { userId: to },
      { $push: { transactionTime: transactionTime } }
    );
    await Transaction.updateOne(
      { userId: to },
      { $push: { transactionTo: transactionFrom.firstName } }
    );
    await Transaction.updateOne(
      { userId: to },
      { $push: { transactionAmount: amount } }
    );
    await Transaction.updateOne(
      { userId: to },
      { $push: { transactionType: "Received" } }
    );

    res.json({
      message: "Transfer Sucessful ",
    });

    const resend = new Resend("re_SjsmPPit_4Jk8ziH7hMZjzbnyi7cEnuPs");
    const receiver = req.body.email;
    try {
      const emailResponse = await resend.emails.send({
        from: "PaySec@webmaven.tech",
        to: receiver,
        subject: "Transaction Successful",
        html: `<h2 style="color: #4CAF50;">🎉 Transaction Successful!</h2>
        <ul>
            <li>💰 <strong>Amount:</strong> Rs. ${req.body.amount}</li>
            <li>📅 <strong>Date & Time:</strong> ${new Date().toLocaleString()}</li>
            <li>🧾 <strong>Recipient Id:</strong> ${req.body.to}</li>
        </ul>
        `,
      });
      console.log("Email sent successfully:", emailResponse);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});

router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
