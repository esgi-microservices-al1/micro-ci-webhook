const amqp = require("amqplib");


connect();

async function connect() {
    try {
        //creates a connection to RabbitMQ server on docker which is running on port 5672
        //and creates a channel to communicate
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        
        //asserts a message queue exists and creates it if it doesn't  
        const result = await channel.assertQueue("jobs");

        //consumes the message through the channel that is linked to the queue "Jobs"
        channel.consume("jobs", message => {
            //callback function to process the message..

            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`);
            if (input.number == 7) {
                //acknoledgment of the message which is a very important 
                //part in order to empty it from the queue 
                channel.ack(message);
            }
        });

        console.log("Waiting for messages..");
    } catch (ex) {
        console.error(ex);
    }
}
