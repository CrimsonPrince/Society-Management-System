const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    //'this' refers to the current document about to be saved
    const user = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    //Replace the plain text password with the hash and then store it
    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
  })

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

userSchema.statics.findUserById = async(userId) => {
    // Search for a user by email and password.
    const user = await User.findById(userId, {password:false, __v: false})
    if (!user) {
        throw new Error({ error: 'No User Found with This ID' })
    }
    console.log("Found User with ID: " + user.id)
    return user
}

userSchema.statics.deleteUser = async(userId) => {
    // Search for a user by email and password.
    const user = await User.findByIdAndDelete(userId)
    if (!user) {
        throw new Error({ error: 'No User Found with This ID' })
    }
    delete user.password
    console.log("Deleted User with ID: " + user.id)
    return user
}

userSchema.statics.getAll = async () => {
    // Find All Users
    const users = await User.find({}, {password: false, __v: false})
    return users
}

const User = mongoose.model('User', userSchema)

module.exports = User