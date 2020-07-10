const dotenv = require('dotenv').config();

const amqp = require("amqplib");
console.log(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
console.log(process.env.RABBITMQ_HOST);

connect();

async function connect() {
    try {
        //creates a connection to RabbitMQ server on docker which is running on port 5672
        //and creates a channel to communicate
        // const connection = await amqp.connect("amqp://localhost:5672");
        const opt = {credentials: require('amqplib').credentials.plain(process.env.BROKER_LOGIN, process.env.BROKER_PASSWORD)};
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`, opt, (err, conn) => {});
        
        const channel = await connection.createChannel();
        
        //asserts a message queue exists and creates it if it doesn't  
        const result = await channel.assertQueue(process.env.BROKER_QUEUE);

        //consumes the message through the channel that is linked to the queue "Jobs"
        channel.consume(process.env.BROKER_QUEUE, message => {
            //callback function to process the message..

            const input = JSON.parse(message.content.toString());
            console.log(input)
            channel.ack(message);
        });

        console.log("Waiting for messages..");
    } catch (ex) {
        console.error(ex);
    }
}
