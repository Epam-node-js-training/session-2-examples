var express = require('express')
var mongo = require('mongoskin')

var db = mongo.db("mongodb://localhost:27017/test", { native_parser:true });

//binds db.counter to db.collection('counter')
db.bind('counter')

var app = express()

app.use(function(req, res) {
    db.counter.findOne(function (err, value) {
        if (err)
            throw err

        if (value) {
            db.counter.updateById(value._id, { counter: value.counter + 1 }, function(err, success) {
                if (err)
                    throw err

                res.end("Value: " + (value.counter + 1))
            })
        } else {
            db.counter.insert({ counter: 1 }, function(err, success, value) {
                if (err)
                    throw err

                res.end("Value: 1")
            })
        }
    })
})

app.listen(8080)

