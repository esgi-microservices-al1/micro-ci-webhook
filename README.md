# micro-ci-webhook


**MessageBroker**
This is an example of usage of RabbitMQ as a message broker between publisher and consumers using nodejs and amqplib with amqp protocol

The RabbitMQ server is run on docker and interfaces through port 5672 
commands to spin rabbitmq server on docker

docker run --name rabbitmq -p 5672:5672 -d rabbitmq
