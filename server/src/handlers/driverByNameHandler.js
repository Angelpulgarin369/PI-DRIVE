const getDriverByName = require("../controllers/getDriverByName");

const driverByNameHandler = async (req, res) => {
   

    const { name } = req.query;

    console.log("Valor de 'name' recibido:", name);
    
  
    try {
        const drivers = await getDriverByName(name);
        res.status(200).json(drivers);

    } catch (error) {
        res.status(400).json({error: error.message});
        
    }    
};


module.exports = driverByNameHandler
