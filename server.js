const express = require('express');
var router = express.Router();
const stompit = require('stompit');
const secret = "blabla";
const dockerContainerIP = "172.19.0.2";
const parser = require('./modules/parser');
const crypto = require('crypto');
const app = express();

app.get("/queue", function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text plain' });
    res.write('Work in progress');
    res.end();
});

app.post("/", function (req, res) {
    req.on('data', function (chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        var res = parser.cleanJSONObject(chunk);
        console.log(res);
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
