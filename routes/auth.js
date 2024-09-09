var express = require('express')
var router = express.Router()
const passport = require('passport')
require('./../services/google-auth')

router.get("/google", 
    passport.authenticate('google',{scope: ['email', 'profile']})
)

router.get("/google/callback",
    passport.authenticate('google',{
        successRedirect: '/',
        failureRedirect: '/auth/failure'
    })
)

router.get('/failure', (req,res)=>{
    res.send("Something went wrong authenticating")
})

router.post('/logout', (req,res)=>{
    req.logout(function(err){
        if(err) return next(err)
        res.redirect('/')
    })
})

module.exports = router