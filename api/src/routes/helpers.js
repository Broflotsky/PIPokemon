const { Router } = require('express');
const axios = require('axios');
const { Pokemon , Tipo } =  require ('../db');

const getInfoApi = async () => {
    //setting an array in order to be ablee to save all the url from the api
    const poke_res = (await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50`)).data.results
    let info = [];
    for (let pk of poke_res) {
        info.push(axios.get(pk.url))
    }

    //since we are calling the urls into the array as a fetch we are calling all the porimises
    //we need to use .then in order to get the info
    return Promise.all(info).then((response) => {
        //we are get in to the every single pokemon and calling the data that is contains
        const pokemones = response.map((details) => {
            //we are retriving and OBJ
            return (poke = {
                name: details.data.name,
                id: details.data.id,
                img: details.data.sprites.other.home.front_default,
                types: details.data.types.map((e) => e.type.name),
                attack: details.data.stats[1].base_stat,
                height: details.data.height,
                weight: details.data.weight,
                hp: details.data.stats[0].base_stat,
                defense: details.data.stats[2].base_stat,
                speed: details.data.stats[5].base_stat,
            });
        });
        return pokemones;
     // console.log(pokemones);
    });

}

const getInfoDb = async () => {
return await Pokemon.findAll({
    include:{
        model: Tipo,
        attributes: ['name'],
        through: {
            attributes: [],
        },
    }
})
}

const getAllInfo = async () => {
const apiInfo = await getInfoApi();
const dbInfo = await getInfoDb();
const AllInfo = apiInfo.concat(dbInfo);
return AllInfo;
}



module.exports = {
    getInfoApi, getInfoDb, getAllInfo
}