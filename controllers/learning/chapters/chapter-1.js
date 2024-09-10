const mongoose = require('mongoose')
const LearningProgress = require('./../../../models/learning-progress')
const ElimuWallet = require('./../../../models/rewards')

const chapter_1_page = async(req, res)=>{
    res.render('learning/chapters/chap-1', {req})
}

const chapter_2_page = async(req, res)=>{
    res.render('learning/chapters/chap-2', {req})
}

const chapter_3_page = async(req, res)=>{
    res.render('learning/chapters/chap-3', {req})
}

const chapter_1_enroll = async(req, res)=>{
    let learningProgress = await LearningProgress.updateOne({userEmail: req.user.email},{
        'chapter_1.enrollment': 'In progress' 
    })

    
    res.redirect('/learning/chapter-1')


}

const chapter_2_enroll = async(req, res)=>{
    let learningProgress = await LearningProgress.updateOne({userEmail: req.user.email},{
        'chapter_2.enrollment': 'In progress' 
    })

    res.redirect('/learning/chapter-2')
} 

const chapter_3_enroll = async(req, res)=>{
    let learningProgress = await LearningProgress.updateOne({userEmail: req.user.email},{
        'chapter_3.enrollment': 'In progress' 
    })

    res.redirect('/learning/chapter-3')
} 

const markAsCompleted = async(req, res)=>{
    const chapterID = Number(req.params.id)
    
    if(chapterID === 1){

        // Reward of 300
        let learningProgress = await LearningProgress.updateOne({userEmail: req.user.email},{
            'chapter_1.enrollment': 'Completed' 
        })
    
        await ElimuWallet.updateOne({userEmail: req.user.email}, {
            $inc: {
                coinsEarnedOnChapters: 300
            }
        })

    }else if(chapterID === 2){
        // Reward of 500
        let learningProgress = await LearningProgress.updateOne({userEmail: req.user.email},{
            'chapter_2.enrollment': 'Completed' 
        })

        await ElimuWallet.updateOne({userEmail: req.user.email}, {
            $inc: {
                coinsEarnedOnChapters: 500
            }
        })

    }else if(chapterID === 3){

        // Reward of 900
        let learningProgress = await LearningProgress.updateOne({userEmail: req.user.email},{
            'chapter_3.enrollment': 'Completed' 
        })

        await ElimuWallet.updateOne({userEmail: req.user.email}, {
            $inc: {
                coinsEarnedOnChapters: 900
            }
        })
    }

    res.redirect('/learning')
}

module.exports = { chapter_1_page, chapter_2_page, chapter_3_page, chapter_1_enroll, chapter_2_enroll, chapter_3_enroll, markAsCompleted}