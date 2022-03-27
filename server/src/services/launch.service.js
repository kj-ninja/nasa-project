const db = require(`${__dirname}/../models`);

const Launch = db.launches;

// function existsLaunchWidthId(launchId) {
//   return launches.has(launchId);
// }
//
// function abortLaunchById(launchId) {
//   const abortedLaunch = launches.get(launchId);
//   abortedLaunch.upcoming = false;
//   abortedLaunch.success = false;
//
//   return abortedLaunch;
// }

async function findMaxFlightNumber() {
  try {
    return await Launch.max('flightNumber');
  } catch (error) {
    console.error(`Could not find a max flight number ${error}`)
  }
}

module.exports = {
  // existsLaunchWidthId,
  // abortLaunchById,
  findMaxFlightNumber,
};
