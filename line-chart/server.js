const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)

app.use(express.static(__dirname + "/static"))
app.set("view engine", "jade")

server.listen(3002, function(err) {
	if (err) {
		console.log(err)
	} else {
		console.log("server listening on port :3002")
	}
})
