const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const forgetPassword = require('../controllers/forgetpassword.controller')
const {verifyToken} = require('../middleware/auth')
const deposit = require('../controllers/deposit.controller')
const transfer = require('../controllers/transfer.controller')

router.post('/signup', user.signUp)
router.post('/login', user.login )
router.post('/createPin/:id', verifyToken, user.createPin)
router.post('/forgetPassword',  forgetPassword.forgetPassword)
router.patch('/resetPassword', verifyToken, forgetPassword.resetPassword)
router.post('/deposit/:id',  verifyToken, deposit.depositType )
router.post('/transfer/:id', verifyToken, transfer.transferType )

module.exports = router;