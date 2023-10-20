const router = require('express').Router()

const handleLogin = require('../controllers/loginController')
const handleRegistation = require('../controllers/registrationController')
const User = require('../database/User')

router.get('/', (req, res) => {
  res.json({
    message: 'radi'
  })
})

router.post('/register', handleRegistation)
router.post('/login', handleLogin)

module.exports = router