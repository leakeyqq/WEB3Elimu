const mongoose = require('mongoose')

const homePage = async(req, res)=>{
    res.render('index', {req})
}

module.exports = { homePage }