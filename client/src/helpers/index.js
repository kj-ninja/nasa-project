export const getPlanetNameById = (planets, planetId) => {
  const planet = planets.find(planet => planet.id === planetId);
  return planet?.keplerName;
}