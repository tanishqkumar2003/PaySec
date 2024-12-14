const express = require('express');
const router = express.Router();
const { User, Account, Transaction } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { signupBody, signinBody, updateBody } = require("./types");
const { authMiddleware } = require('../middleware');
const bcrypt = require("bcrypt");
const { Resend } = require('resend');


router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    try {
        const existingUser = await User.findOne({
          username: req.body.username,
        });

        if (existingUser) {
          return res.status(411).json({
            message: "Email already taken",
          });
        }

        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          username: req.body.username,
          password: hashedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        const userId = user._id;

        await Account.create({
          userId,
          balance: Math.floor(1 + Math.random() * 10000),
        });

        await Transaction.create({
          userId,
        });

        const token = jwt.sign(
          {
            userId,
          },
          JWT_SECRET
        );

        const resend = new Resend("re_SjsmPPit_4Jk8ziH7hMZjzbnyi7cEnuPs");
        const receiver = req.body.username;
        try {
          const emailResponse = await resend.emails.send({
            from: "PaySec@webmaven.tech",
            to: receiver,
            subject: "Account created successfully",
            html: `<h2 style="color: #4CAF50;">Welcome to PaySec!</h2>
              <p>Your account has been successfully created. 🎉</p>

              <p>We’re excited to have you on board and help you with seamless and secure transactions.</p>
              <ul>
                <li>📅 <strong>Date & Time:</strong> ${new Date().toLocaleString()}</li>
              </ul>

              <h3 style="color: #333;">Next Steps:</h3>
              <ul>
                <li>📋 <strong>Explore:</strong> Check out your dashboard to manage your finances easily.</li>
                <li>🚀 <strong>Start:</strong> Send or receive your first transaction today!</li>
              </ul>

              <h3 style="color: #333;">Security Tip 🔒</h3>
              <p>If you didn’t sign in, please <a href="https://paysec.com/security">secure your account</a> immediately and contact our support team.</p>

              <p>Need help? Reach us at <a href="mailto:support@paysec.com">support@paysec.com</a>.</p>

              <p style="font-size: 14px; color: #888;">Thank you for choosing PaySec – Let’s simplify payments together!</p>

              <hr>
              <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply.</p>
`,
          });
          console.log("Email sent successfully:", emailResponse);
        } catch (emailError) {
          console.error("Error sending email:", emailError);
        }

        res.json({
          message: "User created successfully",
          token: token,
        });
    } catch (error) {
        return res.json({message: error})
    }
    
})


router.post("/signin", async (req, res) => {
        const { success } = signinBody.safeParse(req.body);
        if(!success){
            return res.json({
                message: "Incorrect Inputs"
            })
        }
        // const password =  req.body.password
        try {
            const user = await User.findOne({
              username: req.body.username,
              // password: req.body.password
            });

            const password = req.body.password;
            const isPasswordMatch = await bcrypt.compare(
              password,
              user.password
            );
            if (!isPasswordMatch) {
              return res.status(411).json({
                message: "incorrect password",
              });
            }

            const resend = new Resend("re_SjsmPPit_4Jk8ziH7hMZjzbnyi7cEnuPs");
            const receiver = req.body.username;
            try {
              const emailResponse = await resend.emails.send({
                from: "PaySec@webmaven.tech",
                to: receiver,
                subject: "Logged in successfully",
                html: `<h2 style="color: #4CAF50;">Welcome Back to PaySec!</h2>
                    <p>You’ve successfully signed in to your account. ✅</p>

                    <ul>
                      <li>📅 <strong>Date & Time:</strong> ${new Date().toLocaleString()}</li>
                    </ul>

                    <p>If this was you, no further action is needed. Enjoy managing your transactions with PaySec!</p>

                    <h3 style="color: #333;">Security Tip 🔒</h3>
                    <p>If you didn’t sign in, please <a href="https://paysec.com/security">secure your account</a> immediately and contact our support team.</p>

                    <p>Need help? Reach us at <a href="mailto:support@paysec.com">support@paysec.com</a>.</p>

                    <p style="font-size: 14px; color: #888;">Thank you for using PaySec. Let’s simplify payments together!</p>

                    <hr>
                    <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply.</p>
                    `,
              });
              console.log("Email sent successfully:", emailResponse);
            } catch (emailError) {
              console.error("Error sending email:", emailError);
            }

            if (user) {
              const token = jwt.sign(
                {
                  userId: user._id,
                },
                JWT_SECRET
              );
              res.json({
                token: token,
              });
              return;
            }

            res.json({
              message: "User created successfully",
              token: token,
            });

            res.status(411).json({
              message: "Error while logging in",
            });
        } catch (error) {
            return res.json({
                message: error
            })
        }

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
router.get("/bulk",authMiddleware, async(req, res)=>{
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
