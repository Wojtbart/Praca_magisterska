const ini = require('ini');
const config = ini.parse(fs.readFileSync('../../config.ini','utf-8'));
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
client.login(config.tokens.BOT_TOKEN);