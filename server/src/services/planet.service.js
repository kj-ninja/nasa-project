const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');
const db = require(`${__dirname}/../models`);

const Planet = db.planets;

const isPlanetHabitable = (planet) => {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};

async function savePlanet(planet) {
  try {
    await Planet.findOrCreate({
      where: {keplerName: planet.kepler_name}
    });
  } catch (error) {
    console.error(`Could not save a planet ${error}`)
  }
}

async function findPlanetById(id) {
  try {
    return await Planet.findByPk(id);
  } catch (error) {
    console.error(`Could not find a planet ${error}`)
  }
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', (data) => {
        if (isPlanetHabitable(data)) {
          savePlanet(data);
        }
      })
      .on('error', (error) => {
        console.log(error);
        reject(error);
      })
      .on('end', async () => {
        console.log(`There are ${await Planet.count()} habitable planets!`);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  findPlanetById,
};
