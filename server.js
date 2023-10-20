require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDatabase = require('./config/connectDatabase')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 3500

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(credentials);
app.use(cors(corsOptions));

app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})

connectDatabase()

