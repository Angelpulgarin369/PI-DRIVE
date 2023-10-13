const axios = require("axios");
const { Op } = require('sequelize');
const { Driver, Team } = require('../db');

const imgDefault = "https://www.donolli.com.ar/defaultImagePI.png";

module.exports = async (nameSearch) => {
  try {
    // Obtener datos de la API
    const apiResponse = await axios.get("http://localhost:5000/drivers");
    const apiDrivers = apiResponse.data.map((apiDriver) => ({
      id: apiDriver.id,
      forename: apiDriver.name.forename,
      surname: apiDriver.name.surname,
      image: apiDriver.image.url || imgDefault,
      dob: apiDriver.dob,
      teams: apiDriver.teams,
    }));

    // Normalizar el término de búsqueda
    const normalizedSearchTerm = nameSearch.toLowerCase();

    // Filtrar conductores de la API
    const matchingApiDrivers = apiDrivers.filter((driver) => {
      const fullName = `${driver.forename} ${driver.surname}`.toLowerCase();
      return fullName.includes(normalizedSearchTerm);
    });

    // Filtrar conductores de la base de datos
    const dbDrivers = await Driver.findAll({
      where: {
        [Op.or]: [
          { forename: { [Op.iLike]: `%${nameSearch}%` } },
          { surname: { [Op.iLike]: `%${nameSearch}%` } },
        ],
      },
      include: Team,
    });

    // Combinar conductores de la API y de la base de datos
    const allDrivers = [...dbDrivers, ...matchingApiDrivers];

    // Limitar a 15 resultados
    return allDrivers.slice(0, 15);
  } catch (error) {
    console.error("Error en la función getDriversByName:", error);
    throw error;
  }
};
