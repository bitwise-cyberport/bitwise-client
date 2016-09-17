var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    password: String,
    mobile: String,
    email: String
})

var User = mongoose.model("User", userSchema)
module.exports = User