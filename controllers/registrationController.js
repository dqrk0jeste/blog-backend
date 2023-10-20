const User = require('../database/User')
const bcrypt = require('bcrypt')

const handleRegistation = async (req, res) => {
  try {
    const username = req.body.username
    if(username.length > 20) {
      res.status().json({
        message: 'username cannot be longer than 20 characters'
      })
      return
    }
    if(await User.findOne().where('username').equals(username)) {
      res.status(409).json({
        message: 'username taken'
      })
      return
    }
    const password = await bcrypt.hash(req.body.password, 10)
    const user = {
      username: username,
      password: password
    }
    await User.create(user)
    res.status(201).json({
      message: 'user created'
    })
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500)
  }
};

module.exports = handleRegistation