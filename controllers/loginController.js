const User = require('../database/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const foundUser = await User.findOne().where('username').equals(username)
    if(!foundUser) {
      res.status(401).json({
        message: 'wrong username or password'
      })
      return
    }
    if(await bcrypt.compare(password, foundUser.password)) {
      const accessToken = jwt.sign({
        user: foundUser.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '12h' }
      );
      res.status(200).json({
        token: 'Bearer ' + accessToken
      })
    } else {
      res.status(401).json({
        message: 'wrong username or password'
      })
    }
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500)
  }
};

module.exports = handleLogin