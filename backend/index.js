const express=require('express');
const fs=require('fs');
const ini = require('ini');
const process = require("process");
const path = require('path');
const cors = require('cors');

const mysql=require('mysql');
const cron = require("node-cron");
var nodemailer = require('nodemailer');
const amqp= require('amqplib');
const { Client, GatewayIntentBits } = require('discord.js');


const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
const accountSid = config.tokens.TWILIO_ACCOUNT_SID;
const authToken = config.tokens.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

const PORT=process.env.PORT || 9005;

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });



app.get('/', (req, res) => {
    return res.status(200).send({
      message: 'WITAM!'
    })
  });


app.get('*', (req, res) => {
    res.status(404).send('Nie znaleziono')
})
//DISCORD, TWILIO

const friendsChannelId = '1084577436936704130';
const myUserId = '632611376153755665';

function sendSMS(sms) {
  twilio.messages.create({
      body: sms,
      to: config.tokens.PERSONAL_NUMBER,
      from: config.tokens.TWILIO_NUMBER,
  })
  .then(message => console.log(message.sid));
}

client.on("messageCreate", function(message) {
  if (message.author.bot) return;
   if (message.channel.id == friendsChannelId && message.author.id != myUserId) {
       const sms = `${message.author.username}: ${message.content}`;
       sendSMS(sms);
   }
   else if(message.mentions.members.has(myUserId)) {
       const sms = `${message.author.username} mentioned you in ${message.channel.name}: ${message.content}`;
       sendSMS(sms);
   }
});
client.on("guildMemberAdd", function(member) {
  sendSMS(`${member.user.username} has joined the server!`)
});

client.on("guildMemberRemove", function(member) {
  sendSMS(`${member.user.username} has left the server!`)
});
app.post('/sms', async (req, res) => {
  if(req.body.From != config.tokens.PERSONAL_NUMBER) return;
  const channel = client.channels.cache.get(friendsChannelId);
  channel.send(req.body.Body);

  res.status(201).send({
    message: 'Udalo sie'
  })
});

const userDatabase = [];

app.post('/testowa', (req, res) => {
  const { email, password } = req.body;
  const user = {
    email,
    password
  };

  userDatabase.push(user);

  const welcomeMessage = 'Wiadomośc testowa Wojciecha';

  sendSMS(welcomeMessage);

  res.status(201).send({
    message: 'Account created successfully, kindly check your phone to activate your account!',
    data: user
  })
});
// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });

// client.login(TOKEN);

//RABBITMQ
async function connectToRabbitMQ() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("my-queue");

  //to już jest coś innego
  try {
    console.log('Publishing');
    const exchange = 'user.signed_up';//centrala
    const queue = 'user.sign_up_email';//kolejla
    const routingKey = 'sign_up_email';
    
    await channel.assertExchange(exchange, 'direct', {durable: true});
    await channel.assertQueue(queue, {durable: true});
    await channel.bindQueue(queue, exchange, routingKey);
    
    const msg = {'id': Math.floor(Math.random() * 1000), 'email': 'user@domail.com', name: 'firstname lastname'};
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
    console.log('Message published');
  } catch(e) {
    console.error('Error in publishing message', e);
  } finally {
    console.info('Closing channel and connection if available');
    await channel.close();
    await connection.close();
    console.info('Channel and connection closed');
  }
  process.exit(0);
}
connectToRabbitMQ();



///CRON, EMAIL
cron.schedule('*/1 * * * *',()=>{
  // mailService();
})

function mailService(){
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  //korzystam z gmaila
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shipgamesender@gmail.com",
// use generated app password for gmail
     // pass: "okretyOkrety2",
      pass: "xksigqjsowczylik"      
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

    // send mail with defined transport object
    let info =  {
      // from: '"Fred Foo 👻"shipgamesender@gmail.com', // sender address
      from: '"Wojtek Kox 👻"shipgamesender@gmail.com', // sender address
      to: "wojtektokoxik@gmail.com", // list of receivers
      subject: "Mail Testowy ✔", // Subject line
      text: "Node.js Cron Job Email Demo Test from Wojtek", // plain text body
     // html: "<b>Hello world?</b>", // html body
    };

    mailTransporter.sendMail(info, function (err, data) {
      if (err) {
        console.log("Wystąpił błąd:", err.message);
      } else {
        console.log("---------------------");
        console.log("Email wysłany prawidłowo: "  + data.response);
      }
    });

}
app.use(require('./routes'));

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// mailService();
app.listen(PORT, ()=> console.log(`Nasłuchuje na porcie ${PORT} ...`));

client.login(config.tokens.BOT_TOKEN);
module.exports = app;