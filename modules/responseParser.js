const responseParserGitHub = function(object){
    const res = new Object();
    res['repository_id'] = object['repository']['id'];
    res['repository_name'] = object['repository']['name'];
    res['commit_id'] = object['head_commit']['id'];
    res['commit_message'] = object['head_commit']['message'];
    res['commit_date'] = object['head_commit']['timestamp'];
    res['author_name'] = object['head_commit']['author']['name'];
    res['author_email'] = object['head_commit']['author']['email'];
    res['added_files'] = object['head_commit']['added'];
    res['removed_files'] = object['head_commit']['removed'];
    res['modified_files'] = object['head_commit']['modified'];
    return res;
}

const responseParserGitLab = function(object){
    const res = new Object();
    res['repository_id'] = object['project']['id'];
    res['repository_name'] = object['repository']['name'];
    res['commit_id'] = object['commits'][0]['id'];
    res['commit_message'] = object['commits'][0]['message'];
    res['commit_date'] = object['commits'][0]['timestamp'];
    res['author_name'] = object['commits'][0]['author']['name'];
    res['author_email'] = object['commits'][0]['author']['email'];
    res['added_files'] = object['commits'][0]['added'];
    res['removed_files'] = object['commits'][0]['removed'];
    res['modified_files'] = object['commits'][0]['modified'];
    return res;
}

const responseParserBitBucket = function(object){
    //WIP
}

module.exports.responseParserGitHub = responseParserGitHub;
module.exports.responseParserGitLab = responseParserGitLab;