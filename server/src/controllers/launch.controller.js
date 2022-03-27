const db = require(`${__dirname}/../models`);
const {findMaxFlightNumber, deleteLaunch} = require('../services/launch.service');

const Launch = db.launches;

async function httpGetAllLaunches(req, res) {
  try {
    const response = await Launch.findAll({
      where: { deleted: 0 }
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving planets."
    });
  }
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.planetId) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  const maxFlightNumber = await findMaxFlightNumber();
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    flightNumber: maxFlightNumber + 1,
  });

  try {
    await Launch.create(newLaunch);
    return res.status(201).json(newLaunch);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating new launch.'
    });
  }
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  let launch;

  try {
    launch = await Launch.findOne({where: {id: launchId}});

    if (!launch) {
      return res.status(404).json({
        error: 'Launch not found',
      })
    }

    deleteLaunch(launchId);
    return res.status(200).json(launchId);
  } catch (error) {
    console.log(`Could not make a request to db ${error}`);
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
}
