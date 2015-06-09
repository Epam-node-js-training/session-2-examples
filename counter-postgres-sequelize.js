var express = require('express');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost/counter');

var counter = sequelize.define('counter', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    value: Sequelize.INTEGER
}, {
    timestamps: false,
    tableName: 'counter'
});

var app = express();

app.use(function(req, res) {
    counter.findOne().then(function(result) {
        if (!result) {
            counter.create({ value: 1 }).then(function() {
                res.end("Value: 1");
            });
        } else {
            result.updateAttributes({
                value: result.value + 1
            }).then(function() {
                res.end("Value: " + (result.value));
            });
        }
    });
});

app.listen(8080);

