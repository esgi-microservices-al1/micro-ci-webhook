# micro-ci-webhook


**MessageBroker**
The MessageBroker folder contains three examples of use for two messagebrokers activemq and rabbitmq.
After understanding the concepts and trying both we chose to use activemq with nodejs for the advantages specified on our rapport (myGes).

The current messagebroker (activemq) is injected inside the node server.js in order send the json object that contains commit details to a queue called "WEBHOOK_QUEUE", the activemq instance is running inside a docker-compose container created from the image rmohr/activemq:5.10.0  
