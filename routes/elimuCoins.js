const express = require('express')
const router = express.Router()

const { userWalletPage } = require('./../controllers/elimuCoins/wallet')
const { isLoggedIn } = require('./../middleware/login_status')

router.get('/', isLoggedIn, userWalletPage)

module.exports = router