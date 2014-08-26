var express = require('express')
var util = require('util')
var app = express()

var HttpError = function(status, message) {
    Error.call(this)
    Error.captureStackTrace(this, arguments.callee)

    this.message = message
    this.statusCode = status
}

util.inherits(HttpError, Error)

app.use(function (req, res, next) {
    if ("message" in req.query)
        next()
    else
        next(new HttpError(400, "No message in request"))
})

app.use(function (req, res) {
    res.send(req.query.message)
})

app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500)
    res.send(err.message)
})

app.listen(8080)

