const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pino = require('pino')
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    }
})

userSchema.pre('save', async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  })

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

userSchema.statics.findUserById = async(userId) => {
    const user = await User.findById(userId, {password:false, __v: false})
    if (!user) {
        throw new Error({ error: 'No User Found with This ID' })
    }
    logger.info("Found User with ID: " + user.id)
    return user
}

userSchema.statics.deleteUser = async(userId) => {
    const user = await User.findByIdAndDelete(userId)
    if (!user) {
        throw new Error({ error: 'No User Found with This ID' })
    }
    logger.info("Deleted User with ID: " + user.id)
    return user
}

userSchema.statics.getAll = async () => {
    const users = await User.find({}, {password: false, __v: false})
    logger.info("Retrieved All Users")
    return users
}

const User = mongoose.model('User', userSchema)

module.exports = User