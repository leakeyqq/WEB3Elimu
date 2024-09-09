const mongoose = require('mongoose')

const loginPage = (req, res)=>{
    res.render('forms/login', {res})
}
const registerPage = (req, res)=>{
    res.render('forms/register', {res})
}

module.exports = { loginPage, registerPage }