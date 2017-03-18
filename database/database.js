var filesystem = require('fs');
var models = {};
var relationships = {};

var singleton = function singleton() {

    var SequelizeConstructor = require('sequelize');
    var sequelize = null;
    var pathToModels;

    this.setup = function(modelsPath, databaseName, username, password, specification) {
        sequelize = new SequelizeConstructor(databaseName, username, password, specification);
        pathToModels = modelsPath;
        init();
        console.log(models);
    }

    this.model = function(name) {
        return models[name];
    }

    this.Sequelize = function() {
        return SequelizeConstructor;
    }
    
    // parse the model filenames and create the tables.
    function init() {
        console.log("initting")
        // Create tables
        filesystem.readdirSync(pathToModels).forEach(function(name){
            var object = require("." + pathToModels + "/" + name);
            var options = object.options || {}
            var modelName = name.replace(/\.js$/i, "");
            models[modelName] = sequelize.define(modelName, object.model, options);
            if("relations" in object){
                relationships[modelName] = object.relations;
            }
        });

        // Create relationships
        for(var name in relationships){
            var relation = relationships[name];
            for(var relName in relation){
                var related = relation[relName];
                //console.log(related)
                models[name][relName](models[related]);
            }
        }
    }

    if(singleton.caller != singleton.getInstance){
        throw new Error("This object cannot be instantiated.");
    }
};

singleton.instance = null;

singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
};

module.exports = singleton.getInstance();