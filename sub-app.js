var express = require('express')

var app = express()
var api = express()

api.get('/:id', function (req, res) {
    //...
    res.send('get')
})

api.post('/:id', function (req, res) {
    //...
    res.send('post')
})

var router = express.Router()

router.route('/:id')
    .get(function (req, res) {
        //...
        res.send('get')
    })
    .post(function (req, res) {
        //...
        res.send('post')
    })

app.use('/api', api)
app.use('/router', router)

app.listen(8080)
