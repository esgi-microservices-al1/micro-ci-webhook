const amqp = require("amqplib");


var connect = async function (arg) {
    try {
        //creates a connection to RabbitMQ server on docker which is running on port 5672
        //and creates a channel to communicate
        // const connection = await amqp.connect("amqp://localhost:5672");
        const connection = await amqp.connect("amqp://10.0.0.5:40701");
        const channel = await connection.createChannel();
        
        //asserts a message queue exists and creates it if it doesn't 
        const result = await channel.assertQueue("jobs"); 

        //sends the message to the queue that we created called "Jobs"
        console.log(arg);
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(arg)));
        
        console.log(`job sent succefully`);
    } catch (ex) {
        console.error(ex);
    }
}

module.exports.connect = connect;