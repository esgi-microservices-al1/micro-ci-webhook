// const Consul = require('consul');

// var registerCurrentService = async function (service) {
//     try {
//         consul.agent.service.register({
//             name: service['name'],
//             address: service['address'],
//             port: service['port'],
//             check: {
//                 http: service['check']['http'],
//                 interval: service['check']['interval'],
//                 timeout: service['check']['timeout'],
//             }
//         }, function(err, result) {
//             if (err) {
//                 console.error(err);
//                 throw err;
//             }        
//             console.log(servicename + 'registered successfully! ).');
//         });
        
//     } catch (ex) {
//         console.error(ex);
//     }
// }


// module.exports.registerCurrentService = registerCurrentService;