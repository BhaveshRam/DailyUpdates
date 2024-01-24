const express = require('express')
const {login,signUp,getAllUser} = require('../Controller/User_controller')
const router = express.Router()


router.post('/login',login)
router.post('/signup',signUp)
router.get('/', getAllUser)

module.exports = router