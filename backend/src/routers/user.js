const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');

const router = express.Router()

//Get All Users Route
router.get('/', async (req, res) => {
    try {
        users = await User.getAll()
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/pokemon', async(req, res) => {
    try {
        user = await User.findUserById(req.user._id)
        res.send(user.pokemons)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/pokemon', async (req, res) => {
    try {
        console.log(req.body)
        User.addPokemon(req.user._id, req.body.pokemonId)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/pokemon/delete', async (req, res) => {
    try {
        User.removePokemon(req.user._id, req.body.pokemonId)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Get Current Logged in User with JWT
router.get('/profile', async(req, res) => {
    try {
        user = await User.findUserById(req.user._id)
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/edit', async(req, res) => {
    try {
        const _id = req.user._id
        const user = await User.findOne({ _id })
        console.log(req.body.password)
        console.log(user.email)
        const compare = await bcrypt.compare(req.body.password, user.password)
        console.log(compare)
        if(compare) {
            console.log("hi")
            user.name = req.body.name
            user.email = req.body.email
            user.address = req.body.address
            user.gender = req.body.gender
            user.password = req.body.password
            if(req.body.newpassword != "") user.password = req.body.newpassword
            user.save()
            res.send(user)
        }
        console.log("Error")
        res.status(400).send(compare)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Retrieve Specific User with MongoDB ID
router.get('/:userId', async (req, res) => {
    try {
        user = await User.findUserById(req.params.userId)
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Delete Specific User Route
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