const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router()

const { userWalletPage, withdraw } = require('./../controllers/elimuCoins/wallet')
const { isLoggedIn } = require('./../middleware/login_status')

router.get('/', isLoggedIn, userWalletPage)
router.post('/', isLoggedIn, urlencodedParser, withdraw)

module.exports = router