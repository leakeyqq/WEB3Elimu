require('dotenv').config()
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth2' ).Strategy

const User = require('./../models/user')
const LearningProgress = require('./../models/learning-progress')
const ElimuWallet = require('./../models/rewards')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENTID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_REDIRECT_URI


passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.email })
            .then(existingUser => {
                if (existingUser) {
                return done(null, existingUser)
                } else {
                const user = new User({
                    googleId: profile.id,
                    email: profile.email,
                    displayName: profile.displayName,
                    authService: profile.provider,
                    profilePicture: profile.picture,
                    joinedOn: new Date() 
                })
                return user.save()
                    .then(async (user) => {

                    // Create a learning progress model
                    createLearningRecord(profile.email)
                    // Create a elimu wallet model
                    createWalletRecord(profile.email)

                     done(null, user)
                    }
                  )
                
                    .catch(err => done(err))
                }
            })

            .catch(err => done(err))
  }
));
passport.serializeUser(function(user,done){
    done(null,user.id)
})
passport.deserializeUser(function(id,done){
    User.findById(id, {email : 1, displayName : 1, profilePicture: 1})
        .then(user =>{
            return done(null, user)
        })
        .catch(err=> done(err))
})
function createLearningRecord(email){
    let learningProgress = new LearningProgress({
        userEmail: email
    })

    learningProgress.save()
}
function createWalletRecord(userEmail){
    let elimuWallet = new ElimuWallet({
        userEmail: userEmail
    })

    elimuWallet.save()
}
