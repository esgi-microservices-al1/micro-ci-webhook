const dotenv = require('dotenv').config();

const amqp = require("amqplib");

console.log(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
console.log(process.env.RABBITMQ_HOST);

var test = async function () {
    try {
        jsonSample = 
        [   
            "260227559",
            "testCI",
            "Marcohiro/testCI",
            "2020-05-16T14:02:53Z",
            "234bebd7f6c0624edc446413b62b50f7170116ea",
            "test1",
            "elbaraka.amine2@gmail.com",
            "MrBarak45",
            [],
            [],
            "test.txt" 
        ];
        //creates a connection to RabbitMQ server on docker which is running on port 5672
        //and creates a channel to communicate
        // const connection = await amqp.connect("amqp://localhost:5672");
        const opt = {credentials: require('amqplib').credentials.plain(process.env.BROKER_LOGIN, process.env.BROKER_PASSWORD)};
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`, opt, (err, conn) => {});
                        //amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
        const channel = await connection.createChannel();

        //asserts a message queue exists and creates it if it doesn't 
        const result = await channel.assertQueue(process.env.BROKER_QUEUE); 

        //sends the message to the queue that we created called "Jobs"

        //Buffer.from(JSON.stringify(jsonSample))
        channel.sendToQueue(process.env.BROKER_QUEUE, Buffer.from(JSON.stringify(jsonSample)));

        console.log(`job sent succefully`);
    } catch (ex) {
        console.error(ex);
    }
}

test();
