var express = require('express');
var pg = require('pg');

var app = express();

app.use(function(req, res) {
    pg.connect('postgres://localhost/counter', function(err, client, done) {
        client.query('select * from counter limit 1', function(err, result) {
            if (err)
                throw err;

            if (result.rows.length === 0) {
                client.query('insert into counter (value) values($1)', [1], function(err, result) {
                    if (err)
                        throw err;

                    res.end("Value: 1");
                });
            } else {
                var counter = result.rows[0];

                client.query('update counter set value = value + 1 where id = $1', [counter.id], function(err, result) {
                    if (err)
                        throw err;

                    res.end("Value: " + (counter.value + 1));
                });
            }
        });
    });
});

app.listen(8080);

