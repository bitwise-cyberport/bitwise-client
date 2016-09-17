var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    mobile: String
})

var User = mongoose.model("User", userSchema)
module.exports = User