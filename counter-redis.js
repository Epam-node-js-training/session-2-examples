var express = require('express')
var redis = require('redis')

var client = redis.createClient()

var app = express()

app.use(function(req, res) {
    client.incr('counter', function(err, value) {
        if (err)
            throw err

        res.end("Value: " + value)
    })
})

app.listen(8080)
