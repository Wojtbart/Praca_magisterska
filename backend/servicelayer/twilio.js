const ini = require('ini');
const config = ini.parse(fs.readFileSync('../../config.ini','utf-8'));
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
