const asyncHandler = require('express-async-handler')

const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

//@desc Get Transactions
//@route GET /api/transactions
//@acess Private
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id})

    res.status(200).json(transaction)
})

//@desc add transactions
//@route POST /api/transactions
//@acess Private
const addTransaction = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field') 
    }

    if (!req.body.amount){
        res.status(400)
        throw new Error('Please add an amount') 
    }

    const transaction = await Transaction.create({
        text: req.body.text,
        amount: req.body.amount,
        user: req.user.id
    })

    res.status(200).json(transaction)
})

//@desc Update Goals
//@route PUT /api/goals/:id
//@acess Private
// const updateGoal = asyncHandler(async (req, res) => {
//     const goal = await Goal.findById(req.params.id)

//     if(!goal){
//         res.status(400)
//         throw new Error('Goal not found')
//     }



//     //check user
//     if(!req.user) {
//         res.status(401)
//         throw new Error('user nto found')
//     }

//     //make sure logged in user matches goal user
//     if(goal.user.toString() !== req.user.id){
//         res.status(401)
//         throw new Error('user nto authorized')
//     }

//     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     res.status(200).json(updatedGoal)
// })

//@desc Delete transaction
//@route DELETE /api/transaction/:id
//@acess Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)

    if(!transaction){
        res.status(400)
        throw new Error('transaction not found')
    }


    //check user
    if(!req.user) {
        res.status(401)
        throw new Error('user nto found')
    }

    //make sure logged in user matches goal user
    if(transaction.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user nto authorized')
    }
    
    await transaction.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
}