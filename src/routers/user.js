const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/user', async (req, res) => {
    // Create a new user
    try {
        users = await User.getAll()
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/user/:userId', async (req, res) => {
    // Create a new user
    try {
        user = await User.findById(req.param.userId)
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user', async (req, res) => {
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

router.delete('/user', async(req, res) => {
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

// router.post('/users/login', async(req, res) => {
//     //Login a registered user
//     try {
//         const { email, password } = req.body
//         const user = await User.findByCredentials(email, password)
//         if (!user) {
//             return res.status(401).send({error: 'Login failed! Check authentication credentials'})
//         }
//         const token = await user.generateAuthToken()
//         res.send({ user, token })
//     } catch (error) {
//         res.status(400).send(error)
//     }

// })

module.exports = router