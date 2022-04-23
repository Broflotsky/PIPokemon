const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon , Tipo } =  require ('../db');
const { getInfoApi, getInfoDb, getAllInfo } = require ('./helpers');
const { pokemonsGet, pokemonsIdGet, pokemonNew } = require ('./pokemons');
const { typesGet } = require ('./types')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', pokemonsGet);

router.get('/types', typesGet);

router.get('/pokemons/:idPokemon', pokemonsIdGet)

router.post('/pokemons', pokemonNew)


module.exports = router;
