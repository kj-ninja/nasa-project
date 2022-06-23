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
    planetId: {
      type: Sequelize.INTEGER,
      allowNull: true,
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
      allowNull: true,
      validate: {
        notEmpty: true
      },
    },
    customers: {
      type: Sequelize.STRING,
      allowNull: true,
      get() {
        return this.getDataValue('customers')?.split(';')
      },
      set(val) {
        this.setDataValue('customers', val?.join(';'));
      },
    },
    success: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      validate: {
        notEmpty: true
      },
      defaultValue: true,
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: false,
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
};