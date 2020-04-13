const express = require('express')
const User = require('../models/User')
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

// Create User Route
router.post('/', [ 
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().isEmail().normalizeEmail(),
    check('password').escape().isLength({ min: 5 })
], async (req, res) => {
   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const user = new User(req.body)
        await user.save()
        res.status(201).send( user )
    } catch (error) {
        res.status(400).send(error)
    }
})

//Get Current Logged in User with JWT
router.get('/profile', async(req, res) => {
    try {
        res.send(req.user)
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