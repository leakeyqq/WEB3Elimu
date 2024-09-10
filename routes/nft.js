const express = require('express')
const router = express.Router()

const { nftPage } = require('./../controllers/nft/handleNft')

const { isLoggedIn } = require('./../middleware/login_status')


router.get('/', isLoggedIn, nftPage)
module.exports = router