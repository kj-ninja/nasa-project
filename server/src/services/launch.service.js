const db = require(`${__dirname}/../models`);

const Launch = db.launches;

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

module.exports = {
  findMaxFlightNumber,
  deleteLaunch
};
