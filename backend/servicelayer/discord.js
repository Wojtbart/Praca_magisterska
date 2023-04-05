const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const accountSid = config.tokens.TWILIO_ACCOUNT_SID;
const authToken = config.tokens.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

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
   if (message.channel.id == config.discord.friendsChannelId && message.author.id != config.discord.myUserId) {
       const sms = `${message.author.username}: ${message.content}`;
       sendSMS(sms);
   }
   else if(message.mentions.members.has(config.discord.myUserId)) {
       const sms = `${message.author.username} mentioned you in ${message.channel.name}: ${message.content}`;
       sendSMS(sms);
   }
});



// client.on('interactionCreate', async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });

// client.login(TOKEN);

const userDatabase = [];


const sendSmssToDiscord= async (req, res) => {
  if(req.body.From != config.tokens.PERSONAL_NUMBER) return;
  const channel = client.channels.cache.get(config.discord.friendsChannelId);
  channel.send(req.body.Body);
}
client.on('ready', () => {
  console.log(`Zalogowany jako ${client.user.tag}!`);
});


const  sendSmstoDiscordService= (req,res)=>{
  try{
    sendSmssToDiscord(req, res);
  
    res.status(201).send({
      message: 'Udalo się wyslać powiadomienie do Discorda'
      //data: user
    })
  }
  catch(err){
      res.status(500).send({
          message: err.message || "Wystąpił bład w trakcie wykonywanie zapytania"
      });
  } 
}



const  sendSmstoPhone= (req,res)=>{
  try{
    const welcomeMessage = 'Wiadomośc testowa Wojciecha';

    sendSMS(welcomeMessage);
  
    res.status(201).send({
      message: 'Udało się wysłać sms poprawnie!'
      //data: user
    })
  }
  catch(err){
      res.status(500).send({
          message: err.message || "Wystąpił bład w trakcie wykonywania zapytania"
      });
  } 
}

client.login(config.tokens.BOT_TOKEN);
module.exports={sendSmstoPhone,sendSmstoDiscordService};