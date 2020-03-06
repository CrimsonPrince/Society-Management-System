const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/', async (req, res) => {
    // Retrieve all Users
    try {
        users = await User.getAll()
        console.log("Retrieved all Users")
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req, res) => {
    // Create a new user
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
    //We'll just send back the user details and the token
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
        user = await User.deleteUser(req.params.userId)
        res.send(user)
 } 
 catch (error) {
     res.status(400).send(error)
 }
 })

module.exports = router