var appRouter = function(app) {
    
    app.get("/", function(req, res) {
        res.send("Hello World");
    });

    app.get("/messages/", function(req, res) {
        res.send("Here is a list of messages.");
    });
}
 
module.exports = appRouter;