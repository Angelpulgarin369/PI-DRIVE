const axios = require("axios");
const { Driver, Team } = require('../db');

const URL_BASE = 'http://localhost:5000/drivers/';

const getDriverById = async (id) => {

    if (id.includes("-")) {
        // Verificamos si el ID incluye un guion ("-"), lo que indica que es un ID de driver de la base de datos local
        const driver = await Driver.findByPk(id, { include: Team });
        if (driver) {
            // Si encontramos el driver en la base de datos local, procedemos a armar la respuesta
            const driverData = {
                ...driver.dataValues, // Obtenemos los valores de la instancia de Driver
                Team: driver.team, // Agregamos el equipo asociado al objeto de respuesta
            };
            return driverData; // Devolvemos los datos del driver con el equipo asociado
        }
    } else {
        // Si el ID no incluye un guion, asumimos que es un ID de driver de la API
        try {
            const response = await axios.get(`${URL_BASE}${id}`);
            // Realizamos una solicitud a la API para obtener los datos del driver
            if (response.data) {
                // Verificamos si se obtuvieron datos válidos
                return {
                    ...response.data, // Obtenemos los datos del driver de la API
                    Team: response.team, // Agregamos el equipo asociado al objeto de respuesta
                };
            } else {
                throw new Error(`Driver with ID ${id} not found in the API`);
            }
        } catch (error) {
            // Capturamos errores si la solicitud a la API falla
            throw new Error(`Driver with ID ${id} not found in the API`);
        }
    }
}

module.exports = getDriverById;