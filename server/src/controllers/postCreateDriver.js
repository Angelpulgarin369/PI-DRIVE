const { Driver, Team } = require('../db');

const postCreateDriver = async (forename, surname, description, image, nationality, dob, arrTeams) => {
  // Buscar si ya existe un conductor con el mismo nombre
  const existingDriver = await Driver.findOne({
    where: {
      forename,
      surname,
    },
  });

  if (existingDriver) {
    // Si ya existe, lanzar un error de conflicto
    const error = new Error('The pilot already exists');
    error.status = 409; // Código de estado HTTP 409 (Conflict)
    throw error;
  }

  // Crear un nuevo conductor si no existe uno con el mismo nombre
  const newDriver = await Driver.create({
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
  });

  // Asociar equipos existentes al nuevo conductor
  for (const teamName of arrTeams) {
    const team = await Team.findOne({
      where: { name: teamName },
    });
    if (team) {
      // Si se encuentra un equipo con el nombre especificado, se asocia al nuevo conductor
      await newDriver.addTeam(team);
    }
  }

  // Devolver el objeto del nuevo conductor creado
  return newDriver;
};

module.exports = postCreateDriver;
