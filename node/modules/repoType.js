const repoType = {
    GITHUB : "github",
    GITLAB : "gitlab",
    BITBUCKET : "bitbucket"
}

var getType = function getType(chunk){
    if(chunk.includes("github")) return repoType.GITHUB;
    if(chunk.includes("gitlab")) return repoType.GITLAB;
    if(chunk.includes("bitbucket")) return repoType.BITBUCKET;
}

module.exports.repoType = repoType;
module.exports.getType = getType;