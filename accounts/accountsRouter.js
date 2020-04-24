const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();


//READ list of accounts
router.get('/', async (req, res, next) => {
    try {
        const accounts = await db.select('*').from('accounts')
        res.json(accounts)
    } catch(err) {
        next(err)
    }
})

//CREATE new account
router.post('/', async (req, res, next) => {
    try {
        const newAct = {
            name: req.body.name,
            budget: req.body.budget
        }

        const [id] = await db('accounts').insert(newAct)
        const account = db('accounts').where('id', id).first()
            res.json(account)
        } catch(err) {
          next(err)
    }
})



//UPDATE account

//DELETE account

module.exports = router;