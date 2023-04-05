var express = require('express');
var router = express.Router();

const users=require('../controllers/usersController');

router.post('/registerUser', users.registerUser);
router.get('/getUser/:login', users.getUser);

module.exports = router;