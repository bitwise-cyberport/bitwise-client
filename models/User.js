var mongoose = require("mongoose")

var transactionSchema = new mongoose.Schema({
    receiverId: String,
    receiverPassword: String,
    amount: Number,
    timestamp: { type: Date, default: Date.now() },
    senderPhone: String,
    success: Boolean
})

var Transaction = mongoose.Model("Transaction", transactionSchema)
module.exports = Transaction