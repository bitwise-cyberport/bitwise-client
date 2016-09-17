var router = require("express").Router()
var Transaction = require("../../models/Transaction")

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
        receiverPassword: req.body.receiverPassword
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
                data: transaction
            })
        }
    })
})

module.exports = router