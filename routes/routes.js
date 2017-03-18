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
    id: {
        type: Sequelize.INTEGER,
        field: 'user_id', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        autoIncrement: true 
    },
    lat: {
        type: Sequelize.DOUBLE
        //field: 'lat'
    },
    lon: {
        type: Sequelize.DOUBLE
        //field: 'lon'
     }
    }, {
    freezeTableName: true // Model tableName will be the same as the model name
    });

  var Messages = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        field: 'messages_id', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        autoIncrement: true 
    },
    lat: {
        type: Sequelize.DOUBLE,
        field: 'lat'
    },
    lon: {
        type: Sequelize.DOUBLE,
        field: 'lon'
     },
     messages:{
        type: Sequelize.STRING,
        field: 'messages'
     }
    }, {
    freezeTableName: true // Model tableName will be the same as the model name
    });





    Users.sync({force: true}).then(function () {
        // Table created
        return Users.create({
            id: 1, 
            lat: 122.22,
            lon: 123.22,
            //messages:'afaksjdskjdad',
            //tag:'tree'
        });
    });

     Messages.sync({force: true}).then(function () {
        // Table created
        return Messages.create({
            id: 1, 
            lat: 122.22,
            lon: 123.22,
            messages:'afaksjdskjdad',
            tag:'tree'
        },{
            id: 2,
            lat:123,
            lon:125,
            messages:'adadda',
            tag: 'flower'
        });
    });
    

    var results = function filter(param1,param2){
            
            return Messages.findAll({
                 where: {
                     lat: {
                        $lt: param1-10,                // id > 6
                        $gt: param1+10               // id >= 6

                 },
                    lon: {
                        $lt: param2-10,               // id < 10
                        $gt: param2+10
                    }
            //tag:{

            //}
                }
          });
    };

    app.get("/", function(req, res) {
        var id = req.body.id,
            lat = req.body.lat,
            lon = req.body.lon;
        
        var greeting = "Hello world.";

        Users.findOne().then(function (user) {
            greeting += user.get('id','lat','lon');
            res.send(user);
        });
        
    });


    app.post('/message/get', function(req, res) {
        var id = req.body.id ,
            lat = req.body.lat,
            lon = req.body.lon;
            //message = req.body.messages;

        // here is where we would store in the database.

            //console.log(results(req.body.id,req.body.lat,req.body.lon));
    
        res.send(results(req.body.lat,req.body.lon) );

        // this is where we would send back a json object with, message id, success/failure, etc.
    });
}
 
module.exports = appRouter;