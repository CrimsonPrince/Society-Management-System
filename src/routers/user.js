const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/users/', async (req, res) => {
    // Retrieve all Users
    try {
        users = await User.getAll()
        console.log("Retrieved all Users")
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/', async (req, res) => {
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

router.get('/profile', async(req, res, next) => {
    console.log("Hi")
    try {
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error)
    }
    //We'll just send back the user details and the token
})


router.get('/users/:userId', async (req, res) => {
    // Create a new user
    console.log(req.params.userId)
    const id = req.params.userId
    try {
        user = await User.findUserById(id)
        console.log(user)
        res.send(user)
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

module.exports = router