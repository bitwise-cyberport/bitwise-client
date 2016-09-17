var router = require("express").Router()
var Transaction = require("../../models/Transaction")
var User = require("../../models/User")

const paypal = require("paypal-rest-sdk")
paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
})


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
    Transaction.create({
        senderId: req.body.userId,
        receiverId: req.body.receiverId,
        receiverPassword: req.body.receiverPassword,
        amount: req.body.amount,
        success: false,
        paymentId: req.body.paymentId
    }, function(err) {
        if (err) {
            next(err)
        }
    })
    console.log(req.body)
    res.json({
        success: true,
        message: "transaction received"
    })
})

/*
    userId: string
 */
router.get("/:userId", function(req, res, next) {
    Transaction.find({
        senderId: req.params.userId
    }, (err, transactions) => {
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
    console.log(req.body)
    Transaction.find({
        receiverId: req.body.receiverId,
        receiverPassword: req.body.receiverPassword,
        success: false
    }, (err, transaction) => {
        console.log(transaction)
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
                }
            })
        }
    })
})

module.exports = router