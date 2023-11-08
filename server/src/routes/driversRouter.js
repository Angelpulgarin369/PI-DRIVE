const { Router } = require("express");
const driversHandler = require("../handlers/driversHandlers");
const driverByIdHandler = require("../handlers/driverbyIdHandler");
const driverByNameHandler = require("../handlers/driverByNameHandler");
const createDriverHandler = require("../handlers/createDriverHandler");

const driversRouter = Router();

driversRouter.get('/', driversHandler);
driversRouter.get('/:id', driverByIdHandler);
driversRouter.get('/name', driverByNameHandler);
driversRouter.post("/", createDriverHandler);


module.exports = driversRouter;