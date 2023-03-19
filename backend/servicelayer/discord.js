const ini = require('ini');
const config = ini.parse(fs.readFileSync('../../config.ini','utf-8'));
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
// client.on("guildMemberAdd", function(member) {
//   sendSMS(`${member.user.username} has joined the server!`)
// });

// client.on("guildMemberRemove", function(member) {
//   sendSMS(`${member.user.username} has left the server!`)
// });


app.post('/sms', async (req, res) => {
  if(req.body.From != config.tokens.PERSONAL_NUMBER) return;
  const channel = client.channels.cache.get(config.discord.friendsChannelId);
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
client.login(config.tokens.BOT_TOKEN);