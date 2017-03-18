var appRouter = function(app) {

    // this is just an example
    // need to move this to a better spot.
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize('seed-db', 'teamseed@seeddb.database.windows.net', 'seed?1234', {
    host: 'seeddb.database.windows.net',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        encrypt: true
    }
    });


    var Users = sequelize.define('users', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING
    }
    }, {
    freezeTableName: true // Model tableName will be the same as the model name
    });

    Users.sync({force: true}).then(function () {
        // Table created
        return Users.create({
            firstName: 'John',
            lastName: 'Hancock'
        });
    });

    app.get("/", function(req, res) {

        var greeting = "Hello world."

        Users.findOne().then(function (user) {
            greeting += user.get('firstName');
            res.send(greeting);
        });
        
    });

    app.post('/message/get', function(req, res) {
        var lat = req.body.lat,
            lon = req.body.lon,
            message = req.body.message;

        // here is where we would store in the database.

        res.send("Message: " + String(message) + " at: " + String(lat) + "," + String(lon));

        // this is where we would send back a json object with, message id, success/failure, etc.
    });
}
 
module.exports = appRouter;