var mongoose = require("mongoose")
var Schema = mongoose.Schema

var transactionSchema = new mongoose.Schema({
    senderId: {type: Schema.Types.ObjectId, ref: "User"},
    receiverId: String,
    receiverPassword: String,
    amount: Number,
    timestamp: { type: Date, default: Date.now() },
    success: Boolean
})

var Transaction = mongoose.Model("Transaction", transactionSchema)
module.exports = Transaction