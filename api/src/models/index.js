const {Sequelize} = require('sequelize');
const {dbUser, dbName, dbPort, dbHost, dbPassword} = require('../utils/config');

const ActivityFactory = require('./Activity');
const CountryFactory = require('./Country');

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`);

const Activity = ActivityFactory(sequelize);
const Country = CountryFactory(sequelize);

//relaciones (de muchos a muchos en este caso)

Country.belongsToMany(Activity, {through: 'CountryActivity'});
Activity.belongsToMany(Country, {through: 'CountryActivity'});

module.exports = {
    conn: sequelize,
    Activity,
    Country,
}