import axios from "axios";
const API_URL = 'v1';

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const {rows: fetchedLaunches} = await response.json();

  return fetchedLaunches;
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    }
  }

}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'delete',
    });
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    }
  }
}

async function httpUpdateLaunchDestination(payload) {
  const {launchId, destinationId} = payload;

  try {
    return await axios.patch(`${API_URL}/launches/${launchId}`, {
      destinationId: Number(destinationId),
    });
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
  httpUpdateLaunchDestination
};
