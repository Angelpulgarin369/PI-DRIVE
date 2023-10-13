// Importamos el modelo Team y axios para hacer solicitudes HTTP
const { Team } = require('../db');
const axios = require('axios');

// Definimos una función asincrónica para obtener todos los equipos
const getAllTeams = async () => {
  try {
    // Intentamos obtener todos los equipos desde la base de datos
    const allTeamsDb = await Team.findAll();

    if (!allTeamsDb.length) {
      // Si no hay equipos en la base de datos, hacemos una solicitud a la API de conductores
      try {
        const response = await axios.get('http://localhost:5000/drivers');
        const drivers = response.data;

        // Extraemos la propiedad 'teams' de cada conductor y creamos un arreglo de arreglos
        const teamArrays = drivers.map(driver => driver.teams);

        // Filtramos los arreglos para eliminar los que son 'undefined'
        const definedTeams = teamArrays.filter(teams => teams !== undefined);

        // Dividimos los nombres de equipos por comas, los limpiamos y los colocamos en un solo arreglo
        const splitTeams = definedTeams.reduce((acc, teams) => {
          const teamsArray = teams.split(',').map(team => team.trim());
          return [...acc, ...teamsArray];
        }, []);

        // Usamos un conjunto (Set) para obtener valores únicos de equipos
        const uniqueTeamsSet = new Set(splitTeams);

        // Convertimos el conjunto nuevamente en un arreglo
        const driverTeams = [...uniqueTeamsSet];

        // Creamos objetos de equipos a partir de los nombres y los almacenamos en la base de datos
        const teamObjects = driverTeams.map(name => ({ name }));
        await Team.bulkCreate(teamObjects);

        // Devolvemos los nombres de equipos ordenados
        return driverTeams.sort();
      } catch (error) {
        console.error('Error al obtener los equipos de la API:', error);
        return [];
      }
    } else {
      // Si hay equipos en la base de datos, los obtenemos y devolvemos ordenados
      const driverTeams = allTeamsDb.map(driver => driver.name);
      return driverTeams.sort();
    }
  } catch (error) {
    console.error('Error al devolver Teams:', error);
  }
};

module.exports = getAllTeams;

