const express = require('express')
const passport = require('passport');
const port = process.env.PORT
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const userRouter = require('./routers/user')
const societyRouter = require('./routers/society')
const unsecuredRouter = require('./routers/unsecured')
require('./db/db')
require('./auth/auth');

const app = express()

app.use(expressLogger);
app.use(express.json())
app.use(unsecuredRouter)
app.use("/users/", passport.authenticate('jwt', { session : false }), userRouter)

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
  });

app.listen(port, () => {
    logger.info(`Server running on port ${port}`)
})