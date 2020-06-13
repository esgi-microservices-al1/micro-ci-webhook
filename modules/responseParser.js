const constants = require('../constants/constants');

function removeProperties(jsonObj, arg){
    arg.forEach(element => {
        delete jsonObj[element];
    });
}

const responseParserGitHub = function(object){
    const res = new Object();
    res['repository_id'] = object['repository']['id'];
    res['repository_name'] = object['repository']['name'];
    object['commits'].forEach(element => {
        removeProperties(element, constants.githubClean);
        removeProperties(element['author'], constants.githubCleanCommiter);
    });
    res['commits'] = object['commits'];
    return res;
}

const responseParserGitLab = function(object){
    const res = new Object();
    res['repository_id'] = object['project']['id'];
    res['repository_name'] = object['repository']['name'];
    object['commits'].forEach(element => {
        removeProperties(element, constants.gitlabClean);
    });
    res['commits'] = object['commits'];
    return res;
}

const responseParserBitBucket = function(object){
    //WIP
}

module.exports.responseParserGitHub = responseParserGitHub;
module.exports.responseParserGitLab = responseParserGitLab;