var express = require('express');
var router = express.Router();

const email=require('../controllers/emailController');

router.post('/email', email.sendMailController);
// router.post('/addEmailTemplate',email.addEmailTemplate);
// router.post('/discord',discord.sendSmstoDiscordService);
// router.post('/sms', discord.sendSmstoPhone);

module.exports = router;