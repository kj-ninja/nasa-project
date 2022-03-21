const {Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define("User", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
  });
}


