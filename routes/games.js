const express = require('express')
const router = express.Router()

const { gameView } = require('./../controllers/games/main')

router.get('/', gameView)

module.exports = router