package webhookteam.activemq.resource;

import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

// This class is used to receive the text message from the queue.
public class MessageReceiver
{
     //URL of the JMS server. DEFAULT_BROKER_URL will just mean that JMS server is on localhost
    private static String url = ActiveMQConnection.DEFAULT_BROKER_URL;

     //Name of the queue we will receive messages from
    private static String queueName = "WEBHOOK_QUEUE";

    public static void main(String[] args) throws JMSException
    {
        System.out.println("url = " + url);

         //Getting JMS connection from the JMS server and starting it
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory(url);
        Connection connection = connectionFactory.createConnection();
        connection.start();


         //Creating session for receiving messages
         Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

         // Destination represents here our queue 'MESSAGE_QUEUE' on the JMS server.
         // MessageConsumer is used for receiving messages from the queue.
        Destination destination = session.createQueue(queueName);

         //MessageConsumer is used for receiving (consuming) messages
        MessageConsumer consumer = session.createConsumer(destination);

         //Here we receive the message.
        Message message = consumer.receive();

        if (message instanceof TextMessage)
        {
            TextMessage textMessage = (TextMessage) message;
            System.out.println("Received message '" + textMessage.getText() + "'");
        }
        connection.close();
    }
}