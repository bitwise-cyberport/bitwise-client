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
router.post("/", function(req, res) {
    Transaction.create({
        senderId: req.body.userId,
        receiverId: req.body.receiverId,
        receiverPassword: req.body.receiverPassword,
        amount: req.body.amount,
        success: false,
        paymentId: req.body.paymentId
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
router.get("/", function(req, res) {

})

module.exports = router