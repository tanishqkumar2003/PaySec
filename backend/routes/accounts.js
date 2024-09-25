const express = require('express');
const { Account, Transaction, User } = require('../db');
const { authMiddleware } = require('../middleware');
const { mongoose } = require('mongoose');
const router = express.Router();


router.get("/balance", authMiddleware, async (req, res)=>{
    const account = await Account.findOne({userId: req.userId})

    res.json({
        balance: account.balance
    })
});


router.post("/transfer", authMiddleware, async (req, res)=>{
    const session = await  mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({userId: req.userId}).session(session);
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(411).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(411).json({
            message: "Invalid Account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();

    const transactionTime = account.updatedAt;
    const transactionTo = await User.findOne({_id: to});
    const transactionFrom = await User.findOne({_id: req.userId})

    await Transaction.updateOne({userId: req.userId}, {$push:{transactionTime: transactionTime}})
    await Transaction.updateOne({userId: req.userId}, {$push:{transactionTo: transactionTo.firstName}})
    await Transaction.updateOne({userId: req.userId}, {$push:{transactionAmount: amount}})
    await Transaction.updateOne({userId: req.userId}, {$push:{transactionType: "Sent"}})

    await Transaction.updateOne({userId: to}, {$push:{transactionTime: transactionTime}})
    await Transaction.updateOne({userId: to}, {$push:{transactionTo: transactionFrom.firstName}})
    await Transaction.updateOne({userId: to}, {$push:{transactionAmount: amount}})
    await Transaction.updateOne({userId: to}, {$push:{transactionType: "Received"}})

    res.json({
        message: "Transfer Sucessful ",
        transactionFrom
    })
});


module.exports = router;