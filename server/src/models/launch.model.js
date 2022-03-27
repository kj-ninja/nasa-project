module.exports = (sequelize, Sequelize) => {
  return sequelize.define('Launch', {
    flightNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: 0,
    },
    target: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    mission: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    launchDate: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    rocket: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    upcoming: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    success: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: true,
    }
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
};