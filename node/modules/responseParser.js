const constants = require('../constants/constants');
const axios = require('axios');

function removeProperties(jsonObj, arg) {
    arg.forEach(element => {
        delete jsonObj[element];
    });
}

function removeDoubleElement(array) {
    return array.filter((el, index) =>
        array.indexOf(el) === index
    );
}

function bitBucketParser(response, arg) {
    return removeDoubleElement(response.split('\n')
        .filter((x, index) => x.includes('diff') && response.split('\n')[index + 1].includes(arg))
        .flatMap(x => x.split(' ')
            .filter(el => el.includes('/'))
            .map(el => el.substr(2))
        )
    );
}

const responseParserGitHub = function (object) {
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

const responseParserGitLab = function (object) {
    const res = new Object();
    res['repository_id'] = object['project']['id'];
    res['repository_name'] = object['repository']['name'];
    object['commits'].forEach(element => {
        removeProperties(element, constants.gitlabClean);
    });
    res['commits'] = object['commits'];
    return res;
}

async function getData(link) {
    return await axios.get(link);
}

const responseParserBitBucket = async function (object) {
    const res = new Object();
    res['repository_id'] = object['repository']['project']['uuid'];
    res['repository_name'] = object['repository']['project']['name'];
    object['push']['changes'].forEach(element => {
        element['commits'].forEach(commit => {
            removeProperties(commit, constants.bitbucketClean);
        });
    });
    const commits = object['push']['changes'].map(x => x['commits']);
    const links = object['push']['changes'].map(x => x['links']['diff']['href']);
    res['commits'] = await Promise.all(commits.map(async (x, index) => {
        const obj = new Object();
        x.forEach(el => {
            obj['id'] = el['hash'];
            obj['message'] = el['message'];
            obj['timestamp'] = el['date'];
            const author = new Object();
            author['email'] = el['author']['raw']
                .split(' ')[1]
                .slice(1, -1);
            author['username'] = el['author']['raw']
                .split(' ')[0]
                .substr(1);
            obj['author'] = author;
        });
        const response = await getData(links[index]);
        obj['added'] = bitBucketParser(response.data, 'new');
        obj['removed'] = bitBucketParser(response.data, 'deleted');
        obj['modified'] = bitBucketParser(response.data, 'index');
        return obj;
    })).then(value => value);
    return res;
}

module.exports.responseParserGitHub = responseParserGitHub;
module.exports.responseParserGitLab = responseParserGitLab;
module.exports.responseParserBitBucket = responseParserBitBucket;