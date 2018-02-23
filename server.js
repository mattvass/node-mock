/**
 * author: Matthew Vass
 * created: February 18, 2018
 */
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./src/routes')(app, {});

app.listen(port, () => {
    console.log('NodeMock RESTful API server started on: ' + port);
});
