const { Router } = require("express");

const ActivityRoute = require("./activity");
const CountryRoute = require("./country");


const router = Router();


router.use("/countries", CountryRoute);
//router,use("/activity", ActivityRoute);

module.exports = router;