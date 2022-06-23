const {findPlanetById} = require('../planets/planets.model');
const {getSpaceXLaunches} = require('../../services/spacex.service');

const db = require(`${__dirname}/..`);
const Launch = db.launches;

async function getAllLaunches(page, size) {
  try {
    return await Launch.findAndCountAll({
      where: {deleted: 0},
      limit: size,
      offset: page * size,
    });
  } catch (error) {
    console.error(`Could not fetch launches from db ${error}`);
  }
}

async function getNumberOfLaunches() {
  try {
    return await Launch.count();
  } catch (error) {
    console.error(`Could not fetch launches number from db ${error}`);
  }
}

async function findMaxFlightNumber() {
  try {
    return await Launch.max('flightNumber');
  } catch (error) {
    console.error(`Could not find a max flight number ${error}`);
  }
}

async function deleteLaunch(launchId) {
  try {
    await Launch.update({deleted: 1}, {
      where: {
        id: launchId
      }
    });
  } catch (error) {
    console.log(`Could not update launch ${error}`);
  }
}

async function findLaunch(filter) {
  try {
    return await Launch.findOne({
      where: filter
    });
  } catch (error) {
    console.log(`Could not connect to db ${error}`);
  }
}

async function saveLaunch(launch) {
  try {
    await Launch.create(launch);
  } catch (error) {
    console.log(`Could not save launch ${error}`);
  }
}

async function scheduleNewLaunch(launch) {
  const planet = await findPlanetById(launch.planetId);

  if (!planet) {
    throw new Error('No matching planet found');
  }

  const maxFlightNumber = await findMaxFlightNumber();
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    flightNumber: maxFlightNumber + 1,
    customers: ['WSH', 'NASA'],
  });

  await saveLaunch(newLaunch);
}

async function populateSpaceXLaunches() {
  console.log('Downloading launches data...');
  try {
    const spaceXLaunches = await getSpaceXLaunches();

    for (const spaceXLaunch of spaceXLaunches) {
      const payloads = spaceXLaunch['payloads'];
      const customers = payloads.flatMap((payload) => {
        return payload['customers'];
      });

      const launch = {
        flightNumber: spaceXLaunch['flight_number'],
        mission: spaceXLaunch['name'],
        launchDate: spaceXLaunch['date_local'],
        rocket: spaceXLaunch['rocket']['name'],
        upcoming: spaceXLaunch['upcoming'],
        success: spaceXLaunch['success'],
        deleted: 0,
        customers,
      };

      await saveLaunch(launch);
    }
  } catch (error) {
    console.log(`Could not fetch spaceX launches data ${error}`);
  }
}

async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    mission: 'FalconSat',
    rocket: 'Falcon 1',
  });

  if (firstLaunch) {
    console.log('Launch data already loaded');
  } else {
    await populateSpaceXLaunches();
  }
}

module.exports = {
  getAllLaunches,
  deleteLaunch,
  loadLaunchesData,
  scheduleNewLaunch,
  findLaunch,
  getNumberOfLaunches,
};