const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('./../middleware/login_status')
const { overviewPage } = require('./../controllers/learning/progress')

router.get('/', isLoggedIn, overviewPage)

module.exports = router