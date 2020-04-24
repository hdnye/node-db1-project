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
router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
          }
        await db('accounts').where('id', req.params.id).update(payload)
        const updatedAct = await db('accounts').where('id', req.params.id).first()
        res.json(updatedAct)
        } catch(err) {
            next(err)
        }
})

//DELETE account
router.delete('/:id', async (req, res, next) => {
    try { 
       await db('accounts').where('id', req.params.id).del()
       res.status(202).end()
    } catch(err) {
        next(err)
    }
})

module.exports = router;