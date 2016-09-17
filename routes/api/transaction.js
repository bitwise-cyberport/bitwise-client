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

module.exports = router