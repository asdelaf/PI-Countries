const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Country, Activity } = require('../db.js');

router.post("/", async (req, res, next) => {  
    const {duration, season, name, countries, difficulty} = req.body;
    try {
            const act = await Activity.findOne({where: {name: name}, include: [{model: Country}]});

            if(act){
                const newCountries = [];                 
                for(let i=0; i<countries.length; i++){
                    if(!act.countries.find(c => c.id == countries[i].id)){
                        newCountries.push(countries[i])
                    }
                }
                
                const actualizacion = await act.update({
                    name,
                    difficulty,
                    duration,
                    season
                })
                
                const c = await Country.findAll({where: {name:newCountries}});
                await act.addCountry(c)
            }else{
                const new_act = await Activity.create({
                    name: name,
                    difficulty: difficulty,
                    duration: duration,
                    season: season
                });
                const c = await Country.findAll({where: {name:countries}});
                await new_act.addCountry(c)
            }
        res.json({msg: "paso"})    
    } catch (error) {
        next(error)
    }
});

router.get("/", async(req, res, next) => {
    const activities = await Activity.findAll({include: [{model: Country}]})
    try{
        res.json(activities)
    } catch(error) {
        console.log(error)
    }
    
})

router.get("/:name", async(req, res, next) => {
    const {name} = req.params;
    try{
        Activity.findByPk(name, {include: [{model: Country}]}).then(act => {
            act.getCountries().then(coun => {
                res.json(coun)
            })
        })

    } catch(error) {
        console.log(error)
    }
    
})

router.delete("/deleteCountry/:idCountry", async (req, res, next) => {
    const {idCountry} = req.params;
    const {name} = req.body;
    try {
        const activity = await Activity.findOne({where: {name: name}});
        const country = await Country.findByPk(idCountry);
        if(country && activity){
            await activity.removeCountry([country]);
            res.json({msg: `El pais ${country.name} fue desvinculada de la actividad ${name} `})
        }else{
            res.json({msg: "La actividad o pais no existe"})
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;