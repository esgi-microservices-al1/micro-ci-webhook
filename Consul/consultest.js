const consul = require('consul')();

// var check = {
//     name: 'example',
//     ttl: '15s',
//     notes: 'This is an example check.',
//   };
   
//   consul.agent.check.register(check, function(err) {
//     if (err) throw err;
//   });

var registerCurrentService = async function (service) {
    try {

        var uuid = require('uuid');
        var check = {
            name: 'example',
            ttl: '15s',
            notes: 'This is an example check.',
          };
           
        var serviceId = `Microservice-Webhook-${uuid.v4()}`

        consul.agent.service.register({
            name: serviceId,
            address: '127.0.0.1',
            port: 8300,
            },
            function(err, result) { 
                if (err) {
                    console.error(err);
                    throw err;
                }         
        });
        
        var service = `service:${serviceId}`;
        console.log(id);

        consul.agent.check.pass({
            id: service
            // id: service,
        },
        function(err){
            if (err){
                console.error(err) ;
            }
        });


        
    } catch (ex) {
        console.log(ex);
    }
}

registerCurrentService();