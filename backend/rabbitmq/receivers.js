const amqp= require('amqplib');

// //RABBITMQ
// async function connectToRabbitMQ() {
//   try {
//     const amqpServer = "amqp://localhost:15672";
//     connection = await amqp.connect(amqpServer);
//     channel = await connection.createChannel();
//     console.log('Channel created!',channel);
//     await channel.assertQueue("my-queue");
//     console.log('Connected with RabbitMQ!')
    
//   } catch (error) {
//     console.log('Error in Connection!',err)
//   }
  
  
//     //to już jest coś innego
//     // try {
//     //   console.log('Publishing');
//     //   const exchange = 'user.signed_up';//centrala
//     //   const queue = 'user.sign_up_email';//kolejla
//     //   const routingKey = 'sign_up_email';
      
//     //   await channel.assertExchange(exchange, 'direct', {durable: true});
//     //   await channel.assertQueue(queue, {durable: true});
//     //   await channel.bindQueue(queue, exchange, routingKey);
      
//     //   const msg = {'id': Math.floor(Math.random() * 1000), 'email': 'user@domail.com', name: 'firstname lastname'};
//     //   await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
//     //   console.log('Message published');
//     // } catch(e) {
//     //   console.error('Error in publishing message', e);
//     // } finally {
//     //   console.info('Closing channel and connection if available');
//     //   await channel.close();
//     //   await connection.close();
//     //   console.info('Channel and connection closed');
//     // }
//     //process.exit(0);
//   }
// const addDataToRabbitMQ = async (data) => {
//   await channel.sendToQueue('data-channel', Buffer.from("siema"))
// }

// connectToRabbitMQ();
// addDataToRabbitMQ();

async function createConnection (uri = 'guest:guest@localhost:15672') {
  const connection = await amqp.connect('amqp://localhost:5672')// + uri)
  return connection
}

createConnection()
  .then(conn => conn.createChannel())
  .then(ch => {
    console.log('Kanał został stworzony!')

    const queue = 'messages'
    ch.assertQueue(queue)
    ch.consume(queue, function (msg) {
      if (msg !== null) {
        console.log('%s Otrzymano: %s', new Date(), msg.content.toString())
        ch.ack(msg)
      }
    })
  });
  