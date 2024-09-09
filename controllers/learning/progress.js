const mongoose = require('mongoose')
const LearningProgress = require('./../../models/learning-progress')

const overviewPage = async(req, res)=>{
    const learningProgress = await LearningProgress.findOne({userEmail: req.user.email}).lean().exec()
    res.render('learning/overview', {req, learningProgress})
}

module.exports = { overviewPage }