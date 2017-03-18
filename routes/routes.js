var appRouter = function(app) {

    var database = require("../database/database");
    
    app.get("/", function(req, res) {
        var greeting = "Hello, world."
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

        Seed.sync().then(function () {
            Seed.create({
                latitude: latitude,
                longitude: longitude,
                note: note
            });

            res.setHeader('Content-Type', 'application/json');
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