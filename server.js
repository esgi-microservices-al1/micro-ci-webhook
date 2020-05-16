const express = require('express');
const flatten = require('flat')
const secret = "blabla";
//const repo = "https://github.com/Marcohiro/testCI";
const repo = "https://gitlab.com/Marcohiro/testmicroservice";

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

const repoType = {
    GITHUB : "github",
    GITLAB : "gitlab",
    BITBUCKET : "bitbucket"
}

function getType(chunk){
    if(chunk.includes("github")) return repoType.GITHUB;
    if(chunk.includes("gitlab")) return repoType.GITLAB;
    if(chunk.includes("bitbucket")) return repoType.BITBUCKET;
}

function getData(jsonobj, arg){
    var res = arg.map(function(value){
        return jsonobj[value];
    });
    return res;
}

app.get("/queue", function(req, res){
    res.writeHead(200, {'Content-Type' : 'text plain'});
    res.write('Work in progress');
    res.end();
});

app.post("/", function(req, res){
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        var jsonobj = flatten(JSON.parse(chunk));
        var jsonobj2 = JSON.parse(chunk);
        console.log(jsonobj);
        switch(getType(chunk.toString())){
            case repoType.GITHUB:
                var arggithub = ["repository.id", "repository.name", "repository.full_name", "repository.updated_at",
                "commits.0.id", "commits.0.message", "commits.0.author.email", "commits.0.author.username", "commits.0.added", "commits.0.removed", "commits.0.modified.0"
                ];  
                var res = getData(jsonobj, arggithub);
                break;
            case repoType.BITBUCKET:
                var arggithub = ["repository.project.uuid", "repository.name", "repository.full_name", "push.changes.0.new.target.date",
                "push.changes.0.commits.0.hash", "push.changes.0.commits.0.summary.raw", "push.changes.0.new.target.author.user.nickname"
                ]; 
                var res = getData(jsonobj, arggithub);
                break;
            case repoType.GITLAB:
                var arggithub = ["project.id", "repository.name", "commits.0.timestamp", "commits.0.id", "commits.0.message", "commits.0.author.name", "commits.0.author.email", "commits.0.author.name" ]; 
                console.log(jsonobj2["project"]["id"]);
                //"commits.0.added", "commits.0.removed", "commits.0.modified"
                var res = getData(jsonobj, arggithub);
                break;
        }
        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && git pull');
        }
        console.log(res);
    });
    res.writeHead(200, {'Content-Type' : 'text plain'});
    res.write('Sucessful commit');
    res.end();
}); 

app.listen(8082, () => console.log("Service listening on port 8082")); 