module.exports = (sequelize, Sequelize) => {
  return sequelize.define('Planet', {
    keplerName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
  },
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
};