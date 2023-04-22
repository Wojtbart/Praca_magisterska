var express = require('express');
var router = express.Router();

const users=require('../controllers/usersController');

router.post('/registerUser', users.registerUser);
router.post('/login', users.login);
router.get('/getUser/:login', users.getUser);
router.post('/saveConfiguration', users.saveConfiguration);

module.exports = router;