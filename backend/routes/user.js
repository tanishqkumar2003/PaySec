const express = require('express');
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { signupBody, signinBody, updateBody } = require("./types");
const { authMiddleware } = require('../middleware');


router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

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

module.exports = router;
