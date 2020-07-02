const express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const app = express();

const parser = require('./modules/chunkParser');
const connect = require('./RabbitMQ/publisher');
const consul = require('./Consul/consul');

consul.register();


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


app.post("/healthcheck", function(req, res){
    let a = consul.serviceId;

    consul.healthcheck(consul.serviceId);
    res.writeHead(200, { 'Content-Type': 'text plain' });
    res.write('Sucessful test health');
    res.end();
    
})

app.post("/unregister", function(req, res){
    consul.unregister(consul.serviceId);
    res.writeHead(200, { 'Content-Type': 'text plain' });
    res.write('Sucessful unregistred');
    res.end();
    
})


var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.listen(8082, () => console.log("Service listening on port 8082")); 