const { Router } = require('express');
const axios = require('axios');
const { Pokemon , Tipo } =  require ('../db');
const { getInfoApi, getInfoDb, getAllInfo } = require ('./helpers')

const pokemonsGet = async (req,res) => {      //RUTA /POKEMONS y NAME
    let name = req.query.name
    const getPokes = await getAllInfo();
    if(name){
        let pokename = await getPokes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        pokename.length ?
        res.status(200).send(pokename) :
        res.status(404).send('No se encontro el Pokémon buscado')
    } else {
        res.status(200).send(getPokes)
    }
}

const pokemonsIdGet = async (req, res) => {
    const { idPokemon } = req.params
    const compinfo = await getAllInfo();

    if(idPokemon){
        const poke = compinfo.filter(e => e.id == idPokemon)
        poke.length>0 ? res.status(200).send(poke) : res.status(400).send('No se encontro un Pokémon')
    }
}

const pokemonNew = async (req, res) => {
    const {name, hp, attack, defense, speed, height, weight, img, createdInDb, types} = req.body;
    if (!name) { res.status(400).send('El campo name es obligatorio') }  
    else {
    let crepoke = await Pokemon.create({
        name, 
        hp, 
        attack, 
        defense, 
        speed, 
        height, 
        weight, 
        img,
        createdInDb,
    });    

    let typeDb = await Tipo.findAll({
        where: { name: types }
    });

    crepoke.addTipo(typeDb);
    return res.status(200).send('Pokémon creado con exito.')}

}


module.exports = {
    pokemonsGet, pokemonsIdGet, pokemonNew
}