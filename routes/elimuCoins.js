const express = require('express')
const router = express.Router()

const { userWalletPage } = require('./../controllers/elimuCoins/wallet')


router.get('/', userWalletPage)

module.exports = router