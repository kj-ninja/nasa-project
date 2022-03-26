'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.launches = require(`${__dirname}/launch.model.js`)(sequelize, Sequelize);
db.planets = require(`${__dirname}/planet.model.js`)(sequelize, Sequelize);

db.planets.hasMany(db.launches, {
  foreignKey: 'target'
});
db.launches.belongsTo(db.planets, {
  foreignKey: 'target'
});

// exports.createLaunch = (launch) => {
//   return Launch.create({
//     title: launch.title,
//     description: launch.description,
//   })
//     .then((launch) => {
//       console.log(">> Created tutorial: " + JSON.stringify(launch, null, 4));
//       return launch;
//     })
//     .catch((err) => {
//       console.log(">> Error while creating tutorial: ", err);
//     });
// };
//
// const launch = new Launch();

module.exports = db;
