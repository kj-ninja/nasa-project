const {Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define("Planet", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
  });
};