const express = require('express');
const flatten = require('flat')
const secret = "blabla";
const repo = "https://github.com/Marcohiro/testCI";

const crypto = require('crypto');
const exec = require('child_process').exec;
const app = express();

const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "title": "Blah",
        "description": "",
        "version": "1.0"
    },
    "produces": ["application/json"],
    "paths": {
        "/": {
            "post": {
                "x-swagger-router-controller": "home",
                "operationId": "index",
                "tags": ["/"],
                "description": "Commit a git change for git hub, gitlab, bitbucket",
                "parameters": [],
                "responses": [{
                    "code": 200,
                    "message" : "Sucessful commit"
                },{
                    "code":400,
                    "message" : "Invalid commit"
                }, {
                    "code":404,
                    "message" : "Forbidden commit"
                }]
            }
        }
    }
};

app.post("/", function(req, res){
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        var arg = ["repository.id", "repository.name", "repository.full_name", "repository.updated_at", "repository.master_branch",
                    "commits.0.id", "commits.0.message", "commits.0.author.name", "commits.0.author.email", "commits.0.author.username", "commits.0.added", "commits.0.removed", "commits.0.modified.0"
        ]; 
        var jsonobj = flatten(JSON.parse(chunk));
        console.log(jsonobj);
        var res = arg.map(function(value){
            //var objectValue = JSON.parse(jsonobj);
            return jsonobj[value];
        });

        //x.filter = new RegExp(x.filter, x.flags);
        //var result = a.match(x.filter);
        //console.log(result)
        console.log(res);
        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && git pull');
        }
    });
    res.writeHead(200, {'Content-Type' : 'text plain'});
    res.write('Sucessful commit');
    res.end();
}); 

app.listen(8082, () => console.log("Service listening on port 8082")); 