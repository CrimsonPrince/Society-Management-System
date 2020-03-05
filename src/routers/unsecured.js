const express = require('express')
const User = require('../models/User')
const jwt = require("jsonwebtoken");
const passport = require('passport');

const router = express.Router()
const key = process.env.JWT_KEY;


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
          return res.json({ token });
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

//  router.post("/register", (req, res) => {
//     User.findOne({ email: req.body.email }).then(user => {
//       if (user) {
//         return res.status(400).json({ Error: "Email already exists" });
//       } else {
//         const newUser = new User({
//           name: req.body.name,
//           email: req.body.email,
//           password: req.body.password
//         });
//         newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//     }
//   });
// })

// router.post("/login", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;// Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ Error: "Email not found" });
//       }// Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };// Sign token
//           jwt.sign(
//             payload,
//             process.env.JWT_KEY,
//             {
//               expiresIn: 900 // 15 Minutes
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: token
//               });
//             }
//           );
//         } else {
//           return res
//             .status(400)
//             .json({ Error:  "Password incorrect" });
//         }
//       });
//     });
//   });

module.exports = router