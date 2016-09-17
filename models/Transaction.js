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

transactionSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        delete ret.receiverPassword;
    }
};

var Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction