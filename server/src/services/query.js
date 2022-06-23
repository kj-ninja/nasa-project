const {getNumberOfLaunches} = require("../models/launches/launches.model");

async function getPagination(query) {
  const pageAsNumber = Number.parseInt(query.page);
  const sizeAsNumber = Number.parseInt(query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  // TODO: After fe implementation, add default size page = 15
  let size = await getNumberOfLaunches();
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }

  return {
    page,
    size
  }
}

module.exports = {
  getPagination,
};