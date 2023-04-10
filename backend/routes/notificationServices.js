var express = require('express');
var router = express.Router();

const email=require('../controllers/emailController');
const smsDiscord=require('../controllers/smsDiscordController');

router.post('/email', email.sendMailController);
// router.post('/addEmailTemplate',email.addEmailTemplate);
router.post('/discord', smsDiscord.sendMessageToDiscordController);
router.post('/sms', smsDiscord.sendSmsToPhoneController);

module.exports = router;