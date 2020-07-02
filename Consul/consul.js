const { port } = require('consul');

const consul = require('consul')();



var uuid = require('uuid');
var serviceId = `TEST-Webhook-${uuid.v4()}`

let details = {
    name: "micro-webhook",
    address : "127.0.0.1",
    port: 8300,
    id : serviceId,
    check: {
        ttl : '10s',
        deregister_critical_service_after: '1m'
    },
    tags : [
        'test new consul',
    ]
};


var register = function (){consul.agent.service.register(details, err => {
    setInterval(() => {
        consul.agent.check.pass({id: `service:${serviceId}`}, err => {
            if(err)
                console.log(err.message, err.stack);
            else
                console.log('consul health')
        });
    }, 5 * 1000);
    
    
})
};

var unregister = function(consul_id){
    process.on('SIGINT', () => {
        console.log('SIGINT. De-Registering...');
        let details = {id: consul_id};
    
        consul.agent.service.deregister(details, (err) => {
            console.log('de-registered.', err);
            process.exit();
        });
    });
}


module.exports.register = register;
module.exports.serviceId = serviceId;
module.exports.unregister = unregister;
