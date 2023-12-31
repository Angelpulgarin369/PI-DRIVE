const axios = require("axios");
const { Op } = require('sequelize'); 
const { Driver, Team } = require('../db');

const imgDefault = "https://www.donolli.com.ar/defaultImagePI.png"

module.exports = async (nameSearch) => {
  
  try {
    const apiResponse = await axios.get("http://localhost:5000/drivers");

    const apiDrivers = apiResponse.data.map((apiDriver) => {
      return {
        id: apiDriver.id,
        forename: apiDriver.name.forename,
        surname: apiDriver.name.surname,
        image: apiDriver.image.url || imgDefault,
        dob: apiDriver.dob,
        teams: apiDriver.teams,
      };
    });

    const normalizedSearchTerm = nameSearch.toLowerCase();

 
    const matchingApiDrivers = apiDrivers.filter((driver) => {
      const fullName = `${driver.forename} `.toLowerCase();
      return fullName.includes(normalizedSearchTerm);
    });

  
    const dbDrivers = await Driver.findAll({
      where: {
        forename: {
          [Op.iLike]: `%${nameSearch}%`
        }
      },
      include: Team,
    });

    const allDrivers = [...dbDrivers, ...matchingApiDrivers];

    return allDrivers.slice(0, 15);

  } catch (error) {
    console.error("Error en la función getDriversByName:", error);
    throw error; 
}
}
