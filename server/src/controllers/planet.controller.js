const db = require(`${__dirname}/../models`);
const Planet = db.planets;

async function httpGetAllPlanets(req, res) {
  Planet.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving planets."
      });
    });
}

module.exports = {
  httpGetAllPlanets,
}
