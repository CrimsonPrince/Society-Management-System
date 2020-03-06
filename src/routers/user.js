const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        users = await User.getAll()
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user
        res.status(201).send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/profile', async(req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get('/:userId', async (req, res) => {
    try {
        user = await User.findUserById(req.params.userId)
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:userId', async(req, res) => {
    try{
        await User.deleteUser(req.params.userId)
        res.sendStatus(200)
 } 
 catch (error) {
     res.status(400).send(error)
 }
 })

module.exports = router