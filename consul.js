const Consul = require('consul');

const consul = new Consul({
    host: '192.168.6.128',
    port: 8500,
    promisify: true,
});

consul.agent.service.register({
    name: serviceName,
    address: '192.168.20.193',
    port: 3000,
    check: {
        http: 'http://192.168.20.193:3000/health',
        interval: '10s',
        timeout: '5s',
    }
}, function(err, result) {
    if (err) {
        console.error(err);
        throw err;
    }

    Console.log (servicename + 'registered successfully! ).
})