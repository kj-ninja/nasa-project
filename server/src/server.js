const http = require('http');
require('dotenv').config();

const app = require('./app');
const db = require(`${__dirname}/models`);
const { loadPlanetsData } = require('./models/planets/planets.model');
const { loadLaunchesData } = require('./models/launches/launches.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// TODO: update project diagram in lucid chart
// TODO: add mysql tests

async function startServer() {
  try {
    await db.sequelize.sync();
    await loadPlanetsData();
    await loadLaunchesData();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();