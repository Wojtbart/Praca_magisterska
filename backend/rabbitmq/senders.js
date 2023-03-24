const amqp = require('amqplib')

async function createConnection (uri = 'admin:admin@localhost:15672') {
    const connection = await amqp.connect('amqp://localhost:5672' )//+ uri)
    return connection
  }
  
  createConnection()
    .then(conn => conn.createChannel())
    .then(ch => {
      console.log('Channel created!')
  
      const queue = 'messages'
      ch.assertQueue(queue)
      setInterval(() => {
        console.log('-> Wysłano wiadomość')
        ch.sendToQueue(queue, Buffer.from('TEST'))
      }, 1000)
    })