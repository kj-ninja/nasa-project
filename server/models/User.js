const {Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
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

  return User;
}


