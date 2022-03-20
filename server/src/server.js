const http = require('http');
const app = require('./app');
const { Sequelize } = require('sequelize');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const sequelize = new Sequelize('countries', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = require(`${__dirname}/../models/user`)(sequelize)

async function startServer() {
  try {
    await loadPlanetsData();
    await sequelize.sync();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();


