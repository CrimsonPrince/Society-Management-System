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
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
})

userSchema.pre('save', async function(next){
    const user = this;
    if (!user.isModified('password')) return next();
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
    const user = await User.findById(userId, {password:false, __v: false}).populate("pokemons")
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
    const users = await User.find({}, {password: false, __v: false}).populate('pokemons')
    logger.info("Retrieved All Users")
    return users
}

userSchema.statics.addPokemon = async (userId, pokemonId) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error({ error: 'No User Found with This ID' })
    }
    if(user.pokemons == undefined) {
        user.pokemons = []
    }
    if (!user.pokemons.includes(pokemonId)) { user.pokemons.push(pokemonId); }
    user.save()
}

userSchema.statics.removePokemon = async (userId, pokemonId) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error({ error: 'No User Found with This ID' })
    }
    const index = user.pokemons.indexOf(pokemonId);
    if (index !== -1) user.pokemons.splice(index, 1);
    user.save()
}

const User = mongoose.model('User', userSchema)

module.exports = User