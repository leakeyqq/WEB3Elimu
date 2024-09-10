const mongoose = require('mongoose')

const gameView = async(req, res)=>{
    res.render('games/main-game', {req})
}

module.exports = { gameView }