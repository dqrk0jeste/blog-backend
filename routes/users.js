const router = require('express').Router()

const handleLogin = require('../controllers/loginController')
const handleRegistation = require('../controllers/registrationController')
const handleLogout = require('../controllers/logoutController')
const { verifyUser } = require('../middleware/verifyUser')
const User = require('../database/User')

router.get('/current', verifyUser, (req, res) => res.json({ user: req.user }))

router.post('/register', handleRegistation)
router.post('/login', handleLogin)
router.post('/logout', handleLogout)

module.exports = router