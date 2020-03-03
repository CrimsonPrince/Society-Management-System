const express = require('express')
const passport = require('passport');
const userRouter = require('./routers/user')
const societyRouter = require('./routers/society')
const port = process.env.PORT
require('./db/db')
require('./auth/auth');

const app = express()

app.use(express.json())
app.use(passport.authenticate('jwt', { session : false }), userRouter)

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
  });
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})