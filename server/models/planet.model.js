module.exports = (sequelize, Sequelize) => {
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