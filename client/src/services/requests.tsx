const API_URL = 'http://localhost:8000';

interface Launch {
  launchDate: string;
  mission: string;
  rocket: string;
  target: string;
}

const httpSubmitLaunch = async (launch: Launch) => {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (e) {
    return {
      ok: false,
    }
  }
}

export { httpSubmitLaunch };