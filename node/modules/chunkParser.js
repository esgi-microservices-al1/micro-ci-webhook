const type = require('./repoType');
const responseParser = require('./responseParser');

const cleanJSONObject = async function (chunk) {
    switch (type.getType(chunk.toString())) {
        case type.repoType.GITHUB:
            const githubRes = JSON.parse(chunk.toString());
            return responseParser.responseParserGitHub(githubRes);

        case type.repoType.BITBUCKET:
            const jsonobj = JSON.parse(chunk.toString());
            return responseParser.responseParserBitBucket(jsonobj);

        case type.repoType.GITLAB:
            const gitlabRes = JSON.parse(chunk.toString());
            return responseParser.responseParserGitLab(gitlabRes);
    }
}

module.exports.cleanJSONObject = cleanJSONObject;