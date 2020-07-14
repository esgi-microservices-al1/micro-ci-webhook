const dotenv = require('dotenv').config();
const dJSON = require('dirty-json');
const amqp = require("amqplib");

console.log(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
console.log(process.env.RABBITMQ_HOST);

var connect = async function (arg) {
    try {
        //creates a connection to RabbitMQ server on docker which is running on port 5672
        //and creates a channel to communicate
        // const connection = await amqp.connect("amqp://localhost:5672");

        const opt = {credentials: require('amqplib').credentials.plain(process.env.BROKER_LOGIN, process.env.BROKER_PASSWORD)};
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`, opt, (err, conn) => {});
        const channel = await connection.createChannel();       

        //asserts a message queue exists and creates it if it doesn't 
        const result = await channel.assertQueue(process.env.BROKER_QUEUE); 

        console.log("====================TYPEOF==============");

        console.log(typeof arg);

        console.log("===========================================");


        //sends the message to the queue that we created called "Jobs"
        //console.log(c.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '));

        channel.sendToQueue(process.env.BROKER_QUEUE, Buffer.from(JSON.stringify(arg)));

        console.log(`job sent succefully`);
    } catch (ex) {
        console.error(ex);
    }
}

module.exports.connect = connect;
