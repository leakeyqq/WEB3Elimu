const mongoose = require('mongoose')
require('dotenv').config()
const config = require('config')

const { Web3 } = require('web3')
const httpProvider = new Web3.providers.HttpProvider('https://sepolia.base.org')
const web3 = new Web3(httpProvider)

const Rewards = require('./../../models/rewards')

const userWalletPage = async(req, res)=>{

    let rewards = await Rewards.findOne({userEmail: req.user.email}).lean().exec()
    
    res.render('elimuCoins/wallet', {req, rewards})
}

const withdraw = async (req, res) => {
    let transaction_fail_count = 0;

    const minABI = require('./../../contract/contractABI.json');
    const toAddress = req.body.receiver;
    const amount = web3.utils.toWei(Number(req.body.amount), 'ether'); // Ensure amount is in the correct format
    
    const privKey = process.env.PRIVKEY;
    const account = web3.eth.accounts.wallet.add(privKey);
    const tokenAddress = config.get('contractAddress');

    console.log('contract address is ', tokenAddress);
    console.log('receiver address is ', toAddress);
    console.log('amount is ', amount);

    const send_token = new web3.eth.Contract(minABI, tokenAddress);

    try {
        const gasEstimate = await send_token.methods.transfer(toAddress, amount).estimateGas({ from: account.address });

        const options = {
            gas: gasEstimate,
            gasPrice: web3.utils.toWei('10', 'Gwei'),
            from: account[0].address
        };

        await send_token.methods.transfer(toAddress, amount).send(options)
            .on('transactionHash', async (txHash) => {
                console.log(txHash);
                // Decrement user balance
                await Rewards.updateOne({ userEmail: req.user.email }, {
                    $inc: {
                        coinsBalance: -parseFloat(web3.utils.fromWei(amount, 'ether')),
                        coinsWithdrawn: parseFloat(web3.utils.fromWei(amount, 'ether'))
                    }
                });
            })
            .on('error', async (err) => {
                transaction_fail_count += 1;
                if (transaction_fail_count == 2) {
                    throw new Error('Transaction failed: ' + err.message);
                }
            });

        res.redirect('/wallet');

    } catch (error) {
        console.error('Error during transaction:', error);
        res.status(500).send('Error during transaction: ' + error.message);
    }
}
module.exports = { userWalletPage, withdraw }