const express = require('express');
const { Account } = require('../db');
const router = express.Router();

router.get("balance", async (req, res)=>{
    const account = await Account.findOne({userId: req.userId})

    res.json({
        balance: account.balance
    })
});



module.exports = router;