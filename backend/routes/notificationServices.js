var express = require('express');
var router = express.Router();

const discord = require('../servicelayer/discord');
const email = require('../servicelayer/email_service');

router.post('/addEmailTemplate',email.addEmailTemplate);
router.post('/sms', discord.sendSmstoPhone);
router.post('/email', email.mailService);
router.post('/discord',discord.sendSmstoDiscordService);


module.exports = router;