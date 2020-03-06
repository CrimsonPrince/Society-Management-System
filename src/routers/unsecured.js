const express = require('express')
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const passport = require('passport')
const pino = require('pino')
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

const router = express.Router()
const key = process.env.JWT_KEY


//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/register', passport.authenticate('register', { session : false }) , async (req, res, next) => {
    res.json({
      message : 'Signup successful',
      user : req.user
    });
  });
  

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