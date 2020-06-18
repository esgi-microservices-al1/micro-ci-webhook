const express = require('express');
var router = express.Router();
const parser = require('./modules/chunkParser');
const app = express();
const connect = require('./RabbitMQ/publisher');

app.get("/queue", function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text plain' });
    res.write('Work in progress');
    res.end();
});

app.post("/", function (req, res) {
    req.on('data', function (chunk) {
        const res = parser.cleanJSONObject(chunk);
        res.then(result => connect(result));
    });
    res.writeHead(200, { 'Content-Type': 'text plain' });
    res.write('Sucessful commit');
    res.end();
});

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.listen(8082, () => console.log("Service listening on port 8082")); 