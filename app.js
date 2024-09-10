const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()
const config = require('config')
const passport = require('passport')
const mongoose = require('mongoose')
var path = require('path')

const app = express()
app.use(bodyParser.json())


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60}     // Session to expire after 1 hour
}))
app.use(passport.initialize())
app.use(passport.session())

// Db connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)


const indexRouter = require('./routes/index')
const formRouter = require('./routes/form')
const authRouter = require('./routes/auth')
const learningRouter = require('./routes/learning')
const elimuCoinsRouter = require('./routes/elimuCoins')
const nftRouter = require('./routes/nft')

 // Set view engine   
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/form', formRouter)
app.use('/auth', authRouter)
app.use('/learning', learningRouter)
app.use('/wallet', elimuCoinsRouter)
app.use('/nft', nftRouter)

app.listen(process.env.APP_RUNNING_PORT, ()=> console.info(`App now listening on port ${process.env.APP_RUNNING_PORT}`))

module.exports = app