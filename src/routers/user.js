const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/', async (req, res) => {
    // Create a new user
    try {
        users = await User.getAll()
        console.log("Retrieved all Users")
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:userId', async (req, res) => {
    // Create a new user
    try {
        user = await User.findById(req.param.userId)
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/', async(req, res) => {
    try{
     const { id } = req.body
     User.findByIdAndDelete(id,  (err,id) => {
        res.json({success: true, message: "User deleted.", id})
      })
 } 
 catch (error) {
     res.status(400).send(error)
 }
 })

router.get('/profile', async(req, res, next) => {
    console.log("Hi")
    try {
        res.send(200)
    } catch (error) {
        res.status(400).send(error)
    }
    //We'll just send back the user details and the token
})

module.exports = router