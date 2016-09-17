var mongoose = require("mongoose")
var Schema = mongoose.Schema

var transactionSchema = new mongoose.Schema({
    senderId: Number,
    receiverId: String,
    receiverPassword: String,
    amount: Number,
    timestamp: { type: Date, default: Date.now() },
    success: Boolean,
    paymentId: String
})

var Transaction = mongoose.Model("Transaction", transactionSchema)
module.exports = Transaction