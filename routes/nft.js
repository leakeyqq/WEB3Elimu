const express = require('express')
const router = express.Router()

const { nftPage } = require('./../controllers/nft/handleNft')

router.get('/', nftPage)
module.exports = router