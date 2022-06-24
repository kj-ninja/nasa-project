const {
  deleteLaunch,
  scheduleNewLaunch,
  getAllLaunches,
  findLaunch,
  updateLaunchDestination,
} = require('../models/launches/launches.model');
const {getPagination} = require("../services/query");

async function httpGetAllLaunches(req, res) {
  const {page, size} = await getPagination(req.query);

  try {
    const response = await getAllLaunches(page, size);
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

  try {
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while retrieving launches."
    });
  }
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  let launch;

  launch = await findLaunch({
    id: launchId,
  });

  if (!launch) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  try {
    await deleteLaunch(launchId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while retrieving launches."
    });
  }
}

async function httpUpdateLaunchDestination(req, res) {
  // TODO: make a generic function to update key-value
  const launchId = Number(req.params.id);
  const destinationId = req.body;

  try {
    await updateLaunchDestination(launchId, destinationId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while retrieving launches."
    });
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
  httpUpdateLaunchDestination,
}
