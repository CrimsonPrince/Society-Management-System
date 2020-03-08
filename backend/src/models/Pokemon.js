const mongoose = require('mongoose')
const validator = require('validator')
const pino = require('pino')
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

const pokemonSchema = mongoose.Schema({
    name: { type: String },
    id: { type: String },
    imageurl: { type: String },
    xdescription: { type: String },
    ydescription: { type: String },
    height: { type: String },
    category: { type: String },
    weight: { type: String },
    typeofpokemon: [{ type: String }],
    weaknesses: [{ type: String }],
    evolutions: [{ type: String }],
    abilities: [{ type: String }],
    hp: { type: Number },
    attack: { type: Number },
    defense: { type: Number },
    special_attack: { type: Number },
    special_defense: { type: Number },
    speed: { type: Number },
    total: { type: Number },
    male_percentage: { type: String },
    female_percentage: { type: String },
    genderless: { type: Number },
    cycles: { type: String },
    egg_groups: { type: String },
    evolvedfrom: { type: String },
    reason: { type: String },
    base_exp: { type: String }
})


pokemonSchema.statics.getAll = async () => {
    const pokemon = await Pokemon.find({}).sort( { id: 1 } )
    logger.info("Retrieved All Pokemon")
    return pokemon
}

pokemonSchema.statics.findPokemonById = async(pokemonId) => {
    const pokemon = await Pokemon.findOne({ id : pokemonId })
    if (!pokemon) {
        throw new Error({ Error: 'No pokemon Found with This ID' })
    }
    logger.info("Found Pokemon with ID: " + pokemonId)
    return pokemon
}

const Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = Pokemon