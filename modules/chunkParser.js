const type = require('./repoType');
const constants = require('../constants/constants');
const responseParser = require('./responseParser');

function removeProperties(jsonObj, arrayArg, stringArg) {
    if (stringArg.length == 0) {
        arrayArg.forEach(element => {
            delete jsonObj[element];
        });
    } else {
        switch (stringArg.length) {
           
            case 1:
                if (isArray(jsonObj, stringArg[0])) {
                    for (let j = 0; j < jsonObj[stringArg[0]].length; j++) {
                        arrayArg.forEach(element => {
                            delete jsonObj[stringArg[0]][j][element];
                        });
                    }
                } else {
                    arrayArg.forEach(element => {
                        delete jsonObj[stringArg[0]][element];
                    });
                }
            break;
            
            case 2:
                if (isArray(jsonObj[stringArg[0]], stringArg[1])) {
                    for (let j = 0; j < jsonObj[stringArg[0]][stringArg[1]].length; j++) {
                        arrayArg.forEach(element => {
                            delete jsonObj[stringArg[0]][stringArg[1]][j][element];
                        });
                    }
                } else {
                    arrayArg.forEach(element => {
                        delete jsonObj[stringArg[0]][stringArg[1]][element];
                    });
                }
            break;
            
            case 3:
                if (isArray(jsonObj[stringArg[0]], stringArg[1])) {
                    for (let j = 0; j < jsonObj[stringArg[0]][stringArg[1]].length; j++) {
                        arrayArg.forEach(element => {
                            delete jsonObj[stringArg[0]][stringArg[1]][j][stringArg[2]][element];
                        });
                    }
                }
                if (isArray(jsonObj[stringArg[0]][stringArg[1]], stringArg[2])) {
                    for (let j = 0; j < jsonObj[stringArg[0]][stringArg[1]][stringArg[2]].length; j++) {
                        arrayArg.forEach(element => {
                            delete jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][j][element];
                        });
                    }
                } else {
                    arrayArg.forEach(element => {
                        delete jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][element];
                    });
                }
            break;
            
            case 4:
                if (isArray(jsonObj[stringArg[0]][stringArg[1]][stringArg[2]], stringArg[3])) {
                    for (let j = 0; j < jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][stringArg[3]].length; j++) {
                        arrayArg.forEach(element => {
                            delete jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][stringArg[3]][j][element];
                        });
                    }
                } else {
                    arrayArg.forEach(element => {
                        delete jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][stringArg[3]][element];
                    });
                }
            break;
           
            case 5:
                if (isArray(jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][stringArg[3]], stringArg[4])) {
                    for (let j = 0; j < jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][stringArg[3]][stringArg[4]].length; j++) {
                        arrayArg.forEach(element => {
                            delete jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][stringArg[3]][stringArg[4]][j][element];
                        });
                    }
                } else {
                    arrayArg.forEach(element => {
                        delete jsonObj[stringArg[0]][stringArg[1]][stringArg[2]][stringArg[3]][stringArg[4]][element];
                    });
                }
            break;
        }
    }
}

function isArray(jsonObj, arg) {
    return jsonObj[arg].length > 0;
}

function removeArrays(jsonObj, arrayArgs, stringArgs) {
    for (let i = 0; i < arrayArgs.length; i++) {
        removeProperties(jsonObj, arrayArgs[i], stringArgs[i]);
    }
}

const cleanJSONObject = function (chunk) {
    switch (type.getType(chunk.toString())) {
        case type.repoType.GITHUB:
            const githubRes = JSON.parse(chunk.toString());
            removeArrays(githubRes, constants.githubCleanArrays, constants.githubCleanStrings);
            return responseParser.responseParserGitHub(githubRes);

        case type.repoType.BITBUCKET:
            const jsonobj = JSON.parse(chunk.toString());
            //console.log(jsonobj['push']['changes'])
            removeArrays(jsonobj, constants.bitbucketCleanArrays, constants.bitbucketCleanStrings);
            var res = new Object();
            return jsonobj;

        case type.repoType.GITLAB:
            const gitlabRes = JSON.parse(chunk.toString());
            removeArrays(gitlabRes, constants.gitlabCleanArrays, constants.gitlabCleanStrings);
            return responseParser.responseParserGitLab(gitlabRes);
    }
}

module.exports.cleanJSONObject = cleanJSONObject;