const mongoose = require('mongoose')

const nftPage = async(req, res)=>{
    res.render('nft/certs', {req})
}

module.exports = { nftPage }