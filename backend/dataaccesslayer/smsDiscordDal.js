const Users=require('../models/Users_model');
const ini = require('ini');
const fs = require('fs');
const config = ini.parse(fs.readFileSync('../config.ini','utf-8'));
const { Client, GatewayIntentBits, Intents, Events  } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: ['CHANNEL', 'MESSAGE', 'REACTION'] });

const accountSid = config.tokens.TWILIO_ACCOUNT_SID;
const authToken = config.tokens.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

// SMS
function sendSMStoPhone(textMessage) {
    sentFrom=config.tokens.TWILIO_NUMBER;
    sentTo=config.tokens.PERSONAL_NUMBER;

    twilio.messages.create({
        body: textMessage,
        from: sentFrom,
        to: sentTo
    })
    .then(message =>{
        console.log(`SMS wysłany z ${sentFrom} do ${sentTo}. SID wiadomosci: ${message.sid}`);
    })
    .catch((error) => {
        console.error(error);
    });
}

const sendSms = async (req,res)=>{
    try {
        const testMessage = 'Wiadomośc testowa sprzedażowa';
        sendSMStoPhone(testMessage); 
    } catch (error) {
        console.log(error);
    }
}

// DISCORD
client.on('ready', () => {
    console.log(`Zalogowano jako klient Discorda: ${client.user.tag}!`);
});
  
// client.on(Events.InteractionCreate, async (interaction) => {
//     const command = interaction.client.commands.get(interaction.commandName);
//     console.log(command);
// 	if (!interaction.isChatInputCommand()) return;

// 	if (interaction.commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	}
// });

// client.on("messageCreate", function(message) {
//     console.log(message)
//   if (message.author.bot) return;
//    if (message.channel.id == config.discord.friendsChannelId && message.author.id != config.discord.myUserId) {
//        const sms = `${message.author.username}: ${message.content}`;
//        sendSMStoPhone(sms);
//    }
//    else if(message.mentions.members.has(config.discord.myUserId)) {
//        const sms = `${message.author.username} mentioned you in ${message.channel.name}: ${message.content}`;
//        sendSMStoPhone(sms);
//    }
// });

const sendToDiscord= async (req, res) => {

    if(req.body.From != config.tokens.PERSONAL_NUMBER) {
        console.log("Numer telefonu z wiadomosci jest niepoprawny z numerem z konfiga");
        return;
    }
    const channel = client.channels.cache.get(config.discord.friendsChannelId);
    channel.send(req.body.Body);
    console.log("Wysłano wiadomośc do serwisu Discord!")
}

const sendMessageToDiscord= (req,res)=>{
    try{
        sendToDiscord(req, res);
    }
    catch(err){
        console.log(err);
    } 
}

client.login(config.tokens.BOT_TOKEN);

module.exports={sendSms, sendMessageToDiscord};