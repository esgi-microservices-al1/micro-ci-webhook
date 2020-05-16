const amqp = require("amqplib");

//takes the number in cmdline to set it as the published message
const msg = {number: process.argv[2]};

connect();
async function connect() {
    try {
        //creates a connection to RabbitMQ server on docker which is running on port 5672
        //and creates a channel to communicate
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        
        //asserts a message queue exists and creates it if it doesn't 
        const result = await channel.assertQueue("jobs"); 

        //sends the message to the queue that we created called "Jobs"
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        
        console.log(`job sent succefully ${msg.number}`);
    } catch (ex) {
        console.error(ex);
    }
}
