var appRouter = function(app) {

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

    app.get("/messages/", function(req, res) {
        res.send("Here is a list of messages.");
    });
}
 
module.exports = appRouter;