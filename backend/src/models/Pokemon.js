const mongoose = require('mongoose')
const validator = require('validator')
const pino = require('pino')
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const limit = process.env.LIMIT

const pokemonSchema = mongoose.Schema({
    name: { type: String },
    id: { type: Number },
    imageurl: { type: String },
    xdescription: { type: String },
    ydescription: { type: String },
    height: { type: String },
    category: { type: String },
    weight: { type: String },
    typeofpokemon: [{ type: String }],
    weaknesses: [{ type: String }],
    evolutions: [{ type: Number }],
    abilities: [{ type: String }],
    color: [{ type: String }],
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
    evolvedfrom: { type: Number },
    reason: { type: String },
    base_exp: { type: String }
})


pokemonSchema.statics.getAll = async () => {
    const pokemon = await Pokemon.find({}).sort( { id: 1 } ).limit(150)
    logger.info("Retrieved All Pokemon")
    return pokemon
}

pokemonSchema.statics.getAllPage = async (page) => {
    logger.info("Page " + limit)
    const pokemon = await Pokemon.find({}).sort( { id: 1 } ).skip(page * parseInt(limit)).limit(parseInt(limit))
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

pokemonSchema.statics.searchNames = async(query) => {
    console.log(query)
    const pokemon = await Pokemon.find({name: {$regex: query, $options: 'i'}})
    console.log(pokemon)
    return pokemon
}

pokemonSchema.statics.searchLevel = async(query) => {
    console.log(query)
    const pokemon = await Pokemon.find({total: {$eq: query}});
    console.log(pokemon)
    return pokemon
}

pokemonSchema.statics.searchCategory = async(query) => {
    console.log(query)
    const pokemon = await Pokemon.find({category: {$regex: query, $options: 'i'}})
    console.log(pokemon)
    return pokemon
}

pokemonSchema.statics.searchType = async(query) => {
    console.log(query)
    const pokemon = await Pokemon.find({typeofpokemon: {$regex: query, $options: 'i'}})
    console.log(pokemon)
    return pokemon
}

pokemonSchema.statics.addPokemon = async(pokemon) => {
    console.log(pokemon.name)
    return true
}

const Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = Pokemon