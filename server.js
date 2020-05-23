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

app.get("/queue", function(req, res){
    res.writeHead(200, {'Content-Type' : 'text plain'});
    res.write('Work in progress');
    res.end();
});

app.post("/", function(req, res){
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        var jsonobj = JSON.parse(chunk);
        switch(getType(chunk.toString())){
            case repoType.GITHUB:
                const arggithub = ['ref', 'before', 'after', 'pusher', 'sender', 'created', 'deleted', 'forced', 'base_ref', 'compare', 'commits'];
                const repository = ['node_id', 'full_name', 'private', 'owner', 'html_url', 'description', 'fork', 'url', 'forks_url', 'keys_url', 
                'collaborators_url', 'teams_url', 'hooks_url', 'issue_events_url',
                'events_url', 'assignees_url', 'branches_url', 'tags_url', 'blobs_url', 'git_tags_url', 'git_refs_url', 'trees_url', 'statuses_url', 'languages_url', 'stargazers_url',
                'contributors_url', 'subscribers_url', 'subscription_url', 'commits_url',
                'git_commits_url', 'comments_url', 'issue_comment_url', 'contents_url',
                'compare_url', 'merges_url', 'archive_url', 'downloads_url', 'issues_url', 'pulls_url',
                'milestones_url', 'notifications_url', 'labels_url', 'releases_url',
                'deployments_url', 'created_at', 'updated_at', 'pushed_at', 'git_url',
                'ssh_url', 'clone_url', 'svn_url', 'homepage', 'size', 'stargazers_count'  ,
                'watchers_count', 'language', 'has_issues'  ,'has_projects'  ,'has_downloads'  ,'has_wiki'  ,'has_pages'  ,'forks_count'  ,'mirror_url'  ,'archived'  ,'disabled'  ,'open_issues_count'  ,'license'  ,'forks'  ,'open_issues'  ,'watchers'  ,'default_branch'  ,'stargazers'  ,'master_branch'];
                const headcommits = ['tree_id', 'distinct', 'url', 'committer'];
                arggithub.forEach(x => delete jsonobj[x]);
                repository.forEach(x => delete jsonobj['repository'][x]);
                headcommits.forEach(x => delete jsonobj['head_commit'][x]);
                var res = jsonobj;
                break;

            case repoType.BITBUCKET:
    
                break;

            case repoType.GITLAB:

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