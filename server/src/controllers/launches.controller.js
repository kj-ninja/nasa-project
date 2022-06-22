const db = require(`${__dirname}/../models`);
const {deleteLaunch, scheduleNewLaunch} = require('../models/launches/launches.model');

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
        error.message || "Some error occurred while retrieving launches."
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

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
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

    await deleteLaunch(launchId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(`Could not make a request to db ${error}`);
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
}
