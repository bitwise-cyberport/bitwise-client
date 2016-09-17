var router = require("express").Router()
var Transaction = require("../../models/Transaction")
var User = require("../../models/User")

const paypal = require("paypal-rest-sdk")
paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
})

const schedule = require("node-schedule")
const moment = require("moment")
const mailgun = require("mailgun").Mailgun
const mg = new mailgun(process.env.MAILGUN_KEY)
const host_email = "nab@nab.com"

/*
{
    userId: string,
    amount: number,
    receiverId: string,
    receiverPassword: string,
    paymentId: string
}
 */
router.post("/", function(req, res, next) {
    console.log("/api/transaction")
    console.log(req.body)
    Transaction.create({
        senderId: req.body.userId,
        receiverId: req.body.receiverId,
        receiverPassword: req.body.receiverPassword,
        amount: req.body.amount,
        success: false,
        paymentId: req.body.paymentId,
        paymentUrl: req.body.paymentUrl
    }, function(err, transaction) {
        console.log("transaction: " + transaction)
        if (err) {
            next(err)
        } else {
            console.log(req.body)
            res.json({
                success: true,
                message: "transaction received"
            })
            scheduleInTwo(moment(transaction.timestamp).add(2, "days").toDate(), transaction)
        }
    })
})

const scheduleInTwo = (time, transaction) => {
    schedule.scheduleJob(time, function() {
        Transaction.findOne({
            _id: transaction._id
        }, (err, transaction) => {
            if (err) {
                console.log("Error before sending transac notif")
                console.log(err)
            } else if (!transaction) {
                console.log("transaction not found")
            } else {
                if (!transaction.success) {
                    User.findOne({
                        userId: transaction.userId
                    }, (err, user) => {
                        if (err) {
                            console.log(err)
                        } else if (user) {
                            mg.sendText(host_email, user.email, "NAB - Transaction confirmation delay", "Dear loyal customer,\n " +
                                "your transaction seems to be taking a lot of time to go through")
                        }
                    })
                    scheduleInTwo(moment().add(2, "days").toDate(), transaction)
                }
            }
        })
    })
}

/*
    userId: string
 */
router.get("/:userId", function(req, res, next) {
    console.log("/api/transaction/"+req.params.userId)
    Transaction.find({
        senderId: req.params.userId
    }).sort({timestamp: -1}).exec((err, transactions) => {
        if (err) {
           next(err)
        } else if (transactions.length == 0) {
            res.status(400).json({
                success: false,
                message: "userId is invalid or no transactions found"
            })
        } else {
            res.json({
                success: true,
                message: "transactions retrieved for specified userId",
                data: transactions
            })
        }
    })
})

/*
receiverId: string,
receiverPassword: string
 */
router.post("/verify", function(req, res, next) {
    console.log("/api/transaction/verify")
    console.log(req.body)
    Transaction.find({
        receiverId: req.body.receiverId,
        receiverPassword: req.body.receiverPassword,
        success: false
    }, (err, transaction) => {
        if (err) {
            next(err)
        } else if (transaction.length == 0) {
            res.status(401).json({
                success: false,
                message: "invalid receiver id or password"
            })
        } else {
            res.json({
                success: true,
                message: "Receiver verification succeeded",
                data: transaction[0]
            })
        }
    })
})

/*
userId: number,
transactionId: string
 */
router.post("/confirm", function(req, res, next) {
    console.log("/api/transaction/confirm")
    console.log(req.body)
    Transaction.findOne({
        _id: req.body.transactionId,
        success: false
    }, function(err, transaction) {
        if (err) {
            next(err)
        } else if (!transaction) {
            res.status(401).json({
                success: false,
                message: "invalid transaction id"
            })
        } else {
            User.findOne({
                userId: req.body.userId
            }, function(err, user) {
                if (err) {
                    next(err)
                } else if (!user) {
                    res.status(401).json({
                        success: false,
                        message: "invalid user id"
                    })
                } else {
                    console.log("user: " + user)
                    const amount = transaction.amount
                    const sender_batch_id = Math.random().toString(36).substring(9);
                    const sender_item_id = Math.random().toString(36).substring(9);
                    const payload = {
                        sender_batch_header: {
                            recipient_type: "EMAIL",
                            sender_batch_id,
                            email_subject: "You have received a payment",

                        },
                        items: [
                            {
                                recipient_type: "EMAIL",
                                amount: {
                                    value: amount,
                                    currency: "HKD"
                                },
                                receiver: user.email,
                                sender_item_id
                            }
                        ]
                    }
                    console.log(payload)
                    paypal.payout.create(payload, true, function(err, payout) {
                        if (err) {
                            console.log(err.response)
                            next(err)
                        } else {
                            console.log("payout succeeded")
                            console.log(payout)
                            res.status(200).json({
                                success: true,
                                message: "payout sent",
                                data: payout
                            })
                        }
                    })
                    Transaction.findOneAndUpdate({
                        _id: req.body.transactionId,
                        success: false
                    }, {success: true}, {upsert: true}, (err, transaction) => {
                        if (err) {
                            console.log(err)
                        } else if (!transaction) {
                            console.log("transaction not found")
                        } else {
                            console.log("changed success to true")
                        }
                    })
                    mg.sendText(host_email, user.email, "NAB - Transaction Complete",
                        "Your transaction of " + transaction.amount + " HKD has been successfully collected at "
                    + moment().format("dddd, hA"), null, null, function(err) {
                            if (err) {
                                console.log("mailgun:")
                                console.log(err)
                            }
                        })
                }
            })
        }
    })
})

module.exports = router