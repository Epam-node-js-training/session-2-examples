var express = require('express')
var mongo = require('mongoose')

mongo.connect("mongodb://localhost/test");

var Counter = mongo.model('Counter', { counter: Int })

var app = express()

app.use(function(req, res) {
    Counter.findOne(function (err, value) {
        if (err)
            throw err

        if (value)
            value.counter += 1
        else
            value = new Counter({ counter: 1 })

        value.save(function (err, value) {
            if (err)
                throw err

            res.end('Value: ' + value.counter)
        })
    })
})

app.listen(8080)

