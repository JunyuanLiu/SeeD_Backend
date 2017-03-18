var database = require("../database/database");
var sequelise = database.Sequelize()

module.exports = {
    model: {
        latitude: sequelise.DOUBLE,
        longitude: sequelise.DOUBLE,
        note: sequelise.STRING
    },
    /*
    relations:{
       hasMany: "World" 
    },
    */
    options:{
        freezeTableName: true
    }
};
