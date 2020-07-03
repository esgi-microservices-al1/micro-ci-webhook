package webhookteam.activemq.resource;

import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

public class MessageSender
{

     // tcp://localhost:61616
    private static String url = ActiveMQConnection.DEFAULT_BROKER_URL;


    private static String queueName = "WEBHOOK_QUEUE";

    public static void main(String[] args) throws JMSException
    {
        System.out.println("url = " + url);

        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory(url);
        Connection connection = connectionFactory.createConnection();
        connection.start();

         //Creating a non transactional session to send/receive JMS message
        javax.jms.Session session = connection.createSession(false, javax.jms.Session.AUTO_ACKNOWLEDGE);

        // The queue will be created automatically on the server
        javax.jms.Destination destination = session.createQueue(queueName);

        /*
         * Destination represents here our queue 'MESSAGE_QUEUE' on the JMS server.
         *
         * MessageProducer is used for sending messages to the queue.
         */
        MessageProducer producer = session.createProducer(destination);
        TextMessage message = session.createTextMessage("testetestese");

        /*
         * Here we are sending our message!
         */
        producer.send(message);

        System.out.println("Message '" + message.getText() + ", Sent Successfully to the Queue");
        connection.close();
    }
}

