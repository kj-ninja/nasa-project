const express = require('express');
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
  httpUpdateLaunchDestination,
} = require('../controllers/launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);
launchesRouter.patch('/:id', httpUpdateLaunchDestination);

module.exports = launchesRouter;
