const express = require('express')
const router = express.Router()

const { loginPage, registerPage } = require('./../controllers/forms/userForm')

router.get('/login', loginPage)
router.get('/register', registerPage)

module.exports = router
