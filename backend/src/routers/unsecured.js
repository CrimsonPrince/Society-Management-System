const express = require('express')
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const passport = require('passport')
const pino = require('pino')
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const { check, validationResult } = require('express-validator')

const router = express.Router()
const key = process.env.JWT_KEY

  // Create User Route
router.post('/register', [ 
  check('fname').not().isEmpty().withMessage('Name is required'),
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
  

 router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        if(err || !user){
          const error = new Error('An Error occurred')
          return next(error);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { _id : user._id, email : user.email };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user : body }, 'top_secret');
          //Send back the token to the user
          logger.info(user._id + " Logged In")
          return res.json({ token });
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

module.exports = router