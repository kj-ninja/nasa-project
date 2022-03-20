const http = require('http');
const app = require('./app');
const db = require(`${__dirname}/../models`);

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  try {
    await loadPlanetsData();
    await db.sequelize.sync();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();