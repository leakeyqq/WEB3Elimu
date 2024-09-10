const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('./../middleware/login_status')
const { overviewPage } = require('./../controllers/learning/progress')

const { chapter_1_page, chapter_2_page, chapter_3_page,  chapter_1_enroll, chapter_2_enroll, chapter_3_enroll, markAsCompleted } = require('./../controllers/learning/chapters/chapter-1')

router.get('/', isLoggedIn, overviewPage)
router.get('/chapter-1', chapter_1_page)
router.get('/chapter-2', chapter_2_page)
router.get('/chapter-3', chapter_3_page)


router.post('/chapter-1', chapter_1_enroll)
router.post('/chapter-2', chapter_2_enroll)
router.post('/chapter-3', chapter_3_enroll)

router.post('/chapter/complete/:id', markAsCompleted)


module.exports = router