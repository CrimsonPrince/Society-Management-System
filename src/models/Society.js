const mongoose = require('mongoose')
const validator = require('validator')

const societySchema = mongoose.Schema({
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
    description: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,
        required: true,
        trim: true
    },
    socials: [{
        social: {
            type: String,
            required: true
        }
    }]
})


societySchema.statics.getAll = async () => {
    // Find All Users
    const users = await User.find({})
    return users
}

societySchema.statics.findById= async(societyId) => {
    // Search for a user by email and password.
    const user = await User.findById(societyId)
    if (!user) {
        throw new Error({ Error: 'No Society Found with This ID' })
    }
    return user
}

const Society = mongoose.model('Society', societySchema)

module.exports = Society