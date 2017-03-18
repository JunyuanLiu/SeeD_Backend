var appRouter = function(app) {

    var database = require("../database/database");
    
    app.get("/", function(req, res) {
        var greeting = "Hello world."
        res.send(greeting);
    });

    app.get('/message/', function(req, res) {
        var Seed = database.model("Seed");
        
        Seed.findAll().then(function(seeds) {
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

            res.send("{success : true}");
        });
    });
}
 
module.exports = appRouter;