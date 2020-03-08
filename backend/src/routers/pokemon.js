const express = require('express')
const Pokemon = require('../models/Pokemon')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        pokemon = await Pokemon.getAll()
        res.send(pokemon)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:pokemonId', async (req, res) => {
    try {
        pokemon = await Pokemon.findPokemonById(req.params.pokemonId)
        res.send(pokemon)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router