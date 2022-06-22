const db = require(`${__dirname}/../models`);
const Planet = db.planets;

async function httpGetAllPlanets(req, res) {
  try {
    const response = await Planet.findAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving planets.'
    });
  }
}

module.exports = {
  httpGetAllPlanets,
}
