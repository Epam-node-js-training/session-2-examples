var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.status(400)
    res.send("No message in request")
})

app.get('/:message', function (req, res) {
    res.send(req.params.message)
})

app.delete(/^delete\/\d+$/i, function (req, res) {
    //regex as route description
})

app.param('example', function (req, res, next, value) {
    req.example = 'example'
    if (/^\w+$/i.text(value))
        next()
    else
        next(new Error('Unexpected value'))
})

app.post('/add/:example/:id?', function(req, res) {
    //req.example is set
    //req.params.id is optional
})

app.put('/update', [
    function (req, res, next) {
        //...
    },
    function (req, res, next) {
        //...
    },
    function (req, res) {
        //...
    }
])

//runs on all requests
app.all('/some/*', ...)

app.listen(8080)
