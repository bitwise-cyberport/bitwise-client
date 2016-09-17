var mongoose = require("mongoose")

var transactionSchema = new mongoose.Schema({
    senderId: Number,
    receiverId: String,
    receiverPassword: String,
    amount: Number,
    timestamp: { type: Date, default: Date.now() },
    success: Boolean,
    paymentId: String
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})
console.log(transactionSchema)

var Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction