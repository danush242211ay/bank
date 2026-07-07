const express = require('express');
const authMiddleware = require('../middleware/auth.middleware')
const accountController = require('../controllers/account.controller')

const router = express.Router();

/* 
-POST api/account/create
-Create a account
*/

router.post('/create',authMiddleware.authMiddleware,accountController.createAccountController)


module.exports = router;
