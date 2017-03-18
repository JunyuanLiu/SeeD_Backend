var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database.
require("./database/database").setup('./models', 'seed-db', 'teamseed@seeddb.database.windows.net', 'seed?1234', {
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

// Setup the routing
var routes = require("./routes/routes.js")(app);

// Start the server.
var server = app.listen(process.env.PORT || 1337, function () {
    console.log("Listening on port %s...", server.address().port);
});
