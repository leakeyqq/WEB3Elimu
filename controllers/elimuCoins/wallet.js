const mongoose = require('mongoose')

const Rewards = require('./../../models/rewards')

const userWalletPage = async(req, res)=>{

    let rewards

    if(req.user){
        rewards = await Rewards.findOne({userEmail: req.user.email}).lean().exec()
        
        if(!rewards){
            rewards = {
                coinsEarnedOnChapters: 0,
                coinsEarnedOnReferring: 0,
                coinsBalance: 0,
                coinsWithdrawn: 0
            }
        }
    }else{
        rewards = {
            coinsEarnedOnChapters: 0,
            coinsEarnedOnReferring: 0,
            coinsBalance: 0,
            coinsWithdrawn: 0
        }
    }
    if(!rewards){

    }
    res.render('elimuCoins/wallet', {req, rewards})
}

module.exports = { userWalletPage }