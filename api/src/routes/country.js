const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Country, Activity } = require('../db.js');
const {Op} = require('sequelize');

const URL_API = "https://restcountries.com/v3/all";


router.get("/", async (req, res, next) => {
    const { name, continent } = req.query;
    
    if(name){
      var nameM = name.toUpperCase();
    }


    
    const countries = await Country.findAll({include: [{model: Activity}], order: [["name", "ASC"]]});
    
      
    try {    
        if(countries.length> 0){
            if(name && continent){
              const results = await Country.findAll({ where: {continent: continent, name: {[Op.like]:`%${nameM}%`}}, include: [{model: Activity}] }); 
              res.json(results)
            }
            if(name){
              const result = await Country.findAll({ where: {name: {[Op.like]:`%${nameM}%`}}, include: [{model: Activity}] });
              res.json(result)
            }
            if(continent){
              const resul = await Country.findAll({ where: {continent: continent}, include: [{model: Activity}] });
              res.json(resul)
            }
            res.json(countries)
        }else{
            const data = await axios.get(URL_API);
            const dataa = data.data;
            const dataApi = dataa.map((c) => {
                return {
                    id: c.cca3,
                    name: c.name.common.toUpperCase(),
                    image: c.flags[1],
                    continent: c.region,
                    capital: c.capital ? c.capital[0] : "No tiene capital",
                    region: c.subregion,
                    area: c.area,
                    population: c.population
                }
            })
            const countriesApi = await Country.bulkCreate(dataApi);
            res.json(countriesApi);
        }
    
    } catch(error) {
        console.log(error)
    }

})

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try{
        if(id){
          const country = await Country.findByPk(id, {include: [{model: Activity}]})
          if(country != 0){
            res.json(country)
          }else{
            res.send("Error, no se encontro el pais")
          }
        }
      }catch(error){
        next(error)
      }

})

module.exports = router;