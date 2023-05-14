var express = require('express');
var router = express.Router();

const email=require('../controllers/emailController');
const smsDiscord=require('../controllers/smsDiscordController');

const getDataFromScripts=require('../controllers/getDataFromScriptsController');
const cron=require('../controllers/cron');

router.post('/email', email.sendMailController);
router.post('/discord', smsDiscord.sendMessageToDiscordController);
router.post('/sms', smsDiscord.sendSmsToPhoneController);

router.post('/getData', getDataFromScripts.getDataFromWebsite);
router.post('/cronJob', cron.sendNotificationJob);

module.exports = router;