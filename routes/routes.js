var appRouter = function(app) {

    var database = require("../database/database");
    
    app.get("/", function(req, res) {
        var greeting = "Database reset."

        var Seed = database.model("Seed");
            Seed.sync({force: true}).then(function () {
                Seed.bulkCreate({
                latitude: -37.800166,
                longitude: 144.963724,
                note: "This is note number 1."
            },{
                latitude: -37.799547,
                longitude: 144.964427,
                note: "This is note number 2."
            },
            {
                latitude: -37.800615,
                longitude: 144.963654,
                note: "This is not number 3."
            },
            )
        });
        
        res.send(greeting);
    });

    app.get('/message/', function(req, res) {
        var Seed = database.model("Seed");
        
        Seed.findAll().then(function(seeds) {
            res.setHeader('Content-Type', 'application/json');
            res.json(seeds);
        });
    });

    app.post('/message/', function(req, res) {

        var Seed = database.model("Seed");

        var latitude = req.body.latitude,
            longitude = req.body.longitude,
            note = req.body.note;

        Seed.sync({force: true}).then(function () {
            Seed.create({
                latitude: latitude,
                longitude: longitude,
                note: note
            });

            res.send("{success : true}");
        });
    });











    var results = function filter(param1, param2){
            
            var Seed = database.model("Seed");
            
            Seed.findAll({
                 where: {
                     latitude: {
                        $lt: parseFloat(param1) - 10,                // id > 6
                        $gt: parseFloat(param1) + 10               // id >= 6

                 },
                    longitude: {
                        $lt: parseFloat(param2) - 10,               // id < 10
                        $gt: parseFloat(param2) + 10
                    }
            //tag:{

            //}
                }
          }).then(function(results){
              return results;
          });
    };

    app.post('/message/getarea', function(req, res) {

        var Seed = database.model("Seed");

        var latitude = req.body.latitude,
            longitude = req.body.longitude,
            note = req.body.note;
    
        res.json(results(latitude, longitude));
});


}
 
module.exports = appRouter;