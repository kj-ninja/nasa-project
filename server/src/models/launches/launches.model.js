const db = require(`${__dirname}/..`);
const Launch = db.launches;

const {findPlanetById} = require('../planets/planets.model');
const {getSpaceXLaunches} = require('../../services/spacex.service');

async function findMaxFlightNumber() {
  try {
    return await Launch.max('flightNumber');
  } catch (error) {
    console.error(`Could not find a max flight number ${error}`)
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
  return await Launch.findOne({
    where: {
      flightNumber: filter.flightNumber,
      mission: filter.mission,
      rocket: filter.rocket,
    }
  });
}

async function saveLaunch(launch) {
  await Launch.create(launch);
}

async function scheduleNewLaunch(launch) {
  const planet = findPlanetById(launch.id);

  if (!planet) {
    throw new Error('No matching planet found');
  }

  const maxFlightNumber = await findMaxFlightNumber();
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    flightNumber: maxFlightNumber + 1,
  });

  try {
    await saveLaunch(newLaunch);
  } catch (error) {
    console.log(`External problem with db ${error}`);
  }
}

async function populateLaunches() {
  console.log('Downloading launches data...');
  try {
    const spaceXLaunches = await getSpaceXLaunches();

    for (const spaceXLaunch of spaceXLaunches) {
      const launch = {
        flightNumber: spaceXLaunch['flight_number'],
        mission: spaceXLaunch['name'],
        launchDate: spaceXLaunch['date_local'],
        rocket: spaceXLaunch['rocket']['name'],
        upcoming: spaceXLaunch['upcoming'],
        success: spaceXLaunch['success'],
        deleted: 0,
      };

      await saveLaunch(launch);
    }
  } catch(error) {
    console.log(`Cannot fetch spaceX launches data ${error}`);
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
    await populateLaunches();
  }
}

module.exports = {
  deleteLaunch,
  loadLaunchesData,
  scheduleNewLaunch,
};