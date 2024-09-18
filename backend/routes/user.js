const express = require('express');
const router = express.Router();
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { signupBody, signinBody, updateBody } = require("./types");
const { authMiddleware } = require('../middleware');


router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: Math.floor(1 + Math.random() * 10000)
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


router.post("/signin", async (req, res) => {
        const { success } = signinBody.safeParse(req.body);
        if(!success){
            return res.json({
                message: "Incorrect Inputs"
            })
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if(user){
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET)
            res.json({
                token: token
            })
            return;
        }

        res.status(411).json({
            message: "Error while logging in"
        })

})

//Update the User information
router.put("/", authMiddleware, async(req, res)=>{
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating the information"
        })
    }

    await User.updateOne({_id: req.userId}, req.body);

    res.json({
        message: "Updated Successfully"
    })
})

// get users from the backend, filterable via firstName/lastName
router.get("/bulk", async(req, res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


router.get("/info" ,authMiddleware, async(req, res)=>{
    const user = await User.findOne({
        _id: req.userId
    })
    if(!user){
        res.status(410).json({
            message: "User not found"
        })
    }
    else{
        res.json({
            user
        })
    }
})


router.get("/accinfo" ,authMiddleware, async(req, res)=>{
    
    const account = await Account.findOne({ userId: req.userId });
    if(!account){
        res.status(410).json({
            message: "Account info not found"
        })
    }
    else{
        res.json({
            account
        })
    }
})


module.exports = router;
