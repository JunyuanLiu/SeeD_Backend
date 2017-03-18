var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 

var routes = require("./routes/routes.js")(app);
 

var Sequelize = require('sequelize');
var sequelize = new Sequelize('seed_database', 'b1deb7f7316124', 'e639b44a', {
  host: 'au-cdbr-azure-southeast-a.cloudapp.net:3306',
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


var User = sequelize.define('user', {
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

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});



var server = app.listen(process.env.PORT || 1337, function () {
    console.log("Listening on port %s...", server.address().port);
});
