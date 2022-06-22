const axios = require("axios");

async function getSpaceXLaunches() {
  const response = await axios.post(process.env.SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        }
      ]
    }
  });
  return response.data.docs;
}

module.exports = {
  getSpaceXLaunches,
};