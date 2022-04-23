const { Router } = require('express');
const axios = require('axios');
const { Pokemon , Tipo } =  require ('../db');
const { getInfoApi, getInfoDb, getAllInfo } = require ('./helpers')

const typesGet = async (req, res)=>{
    const tiposApi = await getInfoApi()
    const tipos = tiposApi.map(e => e.types).flat()
    // console.log(tipos);
    const save = []


    // ESTE FOREACH LO HICE DE FORMA REBUNDANTE PORQUE EL FINDORCREATE DIRECTO SOBRE 'TIPOS' SEGUIA AGREGANDO ITEMS REPETIDOS.
    const tipos2 = tipos.forEach(e => {
        if(!save.includes(e)){
            save.push(e);
        }
    })
  
    save.forEach(e => {
            Tipo.findOrCreate({
            where: { name: e }
        })
    })
  
    const allTipos = await Tipo.findAll();
    res.send(allTipos);
  }

module.exports = {
    typesGet,
}