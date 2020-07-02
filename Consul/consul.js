const { port } = require('consul');

// const consul = require('consul')();
let consul = require('consul')({
    host: "",
    port: 40600,
});


var uuid = require('uuid');
var serviceId = `micro-webhook-${uuid.v4()}`

let details = {
    name: "micro-webhook",
    address : '',
    // address : "127.0.0.1",
    port: 40600,
    // port: 8300,
    id : serviceId,
    check: {
        ttl : '10s',
        deregister_critical_service_after: '1m'
    },
    tags : [
        'test new consul',
    ],
    token: ''
};


// var register = function (){consul.agent.service.register(details, err => {
//     setInterval(() => {
//         consul.agent.check.pass({id: `service:${serviceId}`}, err => {
//             if(err)
//                 console.log(err.message, err.stack);
//             else
//                 console.log('consul health')
//         });
//     }, 5 * 1000);
//     })
// };

var register = function (){consul.agent.service.register(details, err => {
        if(err)
            console.log(err.message, err.stack);
        else
            console.log('consul health');
    });
};

var healthcheck = function(serviceId){
    let idJson ={id: `service:${serviceId}`, token: ''};

    setInterval(() => {
        consul.agent.check.pass(idJson, (err) => {
            if (err)
                console.log(err.message);
        });
    }, 5000);

    // consul.agent.check.pass(idJson , err => {
    //     if(err)
    //         console.log(err.message, err.stack);
    //     else
    //         console.log('consul health');
    // });
};

var unregister = function(consul_id){
    console.log(consul_id);
    const unregisterService = (err) => {
        consul.agent.service.deregister(consul_id, () => {
         process.exit(err ? 1 : 0);
        });
       };
    unregisterService();
    process.on('exit', unregisterService);
    process.on('SIGINT', unregisterService);
    process.on('uncaughtException', unregisterService);

    // process.on('SIGINT', () => {
    //     let details = {id: consul_id};
    //     consul.agent.service.deregister(details, (err) => {
    //         console.log('de-registered.', err);
    //         process.exit();
    //     });
    // });
}


module.exports.register = register;
module.exports.serviceId = serviceId;
module.exports.healthcheck = healthcheck;
module.exports.unregister = unregister;
