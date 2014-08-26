var express = require('express')
var app = express()

app.use(function (req, res) {
    if ("message" in req.query) {
        res.send(req.query.message)
    } else {
        res.status(400)
        res.send("No message in request")
    }
})

app.listen(8080)
