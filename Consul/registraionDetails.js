Class registrationDetails {
    
    var uuid = require('uuid');

    const(client){
        this.name = name;
        this.adress = adress;
        this.port = port;
        this.tag = tags;
        this.id = `${name}-${uuid}`;
    }

    check() = {
        ttl: '10s',
        deregister_critical_service_after: '1m'
    };
}

module.exports.registrationDetails = registrationDetails;


// details = {
//     name: "micro-webhook",
//     address : "127.0.0.1",
//     port: 8300,
//     id : serviceId,
//     check: {
//         ttl : '10s',
//         deregister_critical_service_after: '1m'
//     },
//     tags : [
//         'test 2',
//     ]
// };