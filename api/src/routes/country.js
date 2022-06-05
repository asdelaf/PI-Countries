const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Country } = require("../models");

const URL_API = "https://restcountries.com/v3/all";




router.get("/", async (req, res, next) => {
    const countries = await Country.findAll();
    try {
        if(countries.length> 0){
            res.json(countries)
        }else{
            const data = await axios.get(URL_API);
            const dataa = data.data;
            const dataApi = dataa.map((c) => {
                return {
                    id: c.cca3,
                    name: c.name.common,
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


module.exports = router;