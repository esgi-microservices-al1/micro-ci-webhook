const express = require('express');
var router = express.Router();
const flatten = require('flat')
const secret = "blabla";


const crypto = require('crypto');
const exec = require('child_process').exec;
const app = express();


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
        var jsonobj2 = JSON.parse(chunk);
        switch(getType(chunk.toString())){
            case repoType.GITHUB:
                delete jsonobj2.repository.node_id;
                delete jsonobj2.repository.private;
                delete jsonobj2.repository.owner;
                // console.log(jsonobj2);
                var res = jsonobj2;
                // var arggithub = ["repository.id", "repository.name", "repository.full_name", "repository.updated_at",
                // "commits.0.id", "commits.0.message", "commits.0.author.email", "commits.0.author.username", "commits.0.added", "commits.0.removed", "commits.0.modified.0"
                // ];  
                // var res = getData(jsonobj, arggithub);
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
        console.log(res);
    });
    res.writeHead(200, {'Content-Type' : 'text plain'});
    res.write('Sucessful commit');
    res.end();
}); 


var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.listen(8082, () => console.log("Service listening on port 8082")); 