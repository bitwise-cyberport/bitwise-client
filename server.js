var express = require("express")
var http = require("http")
var mongoose = require("mongoose")
var app = express()
var server = http.createServer(app)
var bodyParser = require("body-parser")
var cors = require("cors")

require("dotenv").config() //loads environment variables from .env file

app.use(express.static(__dirname + "/public"))

/** Middleware **/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error, check the logs for more details.'
    });
})


/** Mongodb setup **/
mongoose.connect(process.env.DATABASE_URL, function(err) {
    if (err) throw err
})
mongoose.connection.on("error", console.error.bind(console, 'connection error:'))

var User = require('./models/User')
// User.create({
//     userId: 1,
//     name: "Daniel",
//     password: "nabnabnabnab",
//     mobile: "+85297098969",
//     email: "test@nab.com",
//     mailgun: "hsing.daniel@gmail.com"
// })
// User.create({
//     userId: 2,
//     name: "Nab",
//     password: "nabnabnabnab",
//     mobile: "+85297098969",
//     email: "admin@nab.com",
//     mailgun: "hsing.daniel@gmail.com"
// })



/** Routes setup **/
var apiBaseRoute = require("./routes/api/api")
var apiTransactionRoute = require("./routes/api/transaction")
app.use("/api", apiBaseRoute)
app.use("/api/transaction", apiTransactionRoute)


/** Error handlers **/
app.use(function (req, res, next) { //Forward 404 request to handlers
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    if (err.status == 404) {
        res.status(404).json({
            success: false,
            message: "endpoint not found"
        })
    } else {
        next(err)
    }
})
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || 'Internal server error'
    })
    console.log(err)
});


/** Port binding **/
server.listen(process.env.PORT_NUMBER, function(err) {
    if (err) {
        console.log("Error binding to port: " + process.env.PORT_NUMBER)
        console.log(err)
    } else {
        console.log("Server listening on port: " + process.env.PORT_NUMBER)
    }
})
