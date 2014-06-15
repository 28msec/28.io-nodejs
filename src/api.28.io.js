exports.$28 = function(config){
    'use strict';

    var Auth = require('./auth.api.28.io').Auth;
    var Project = require('./project.api.28.io').Project;
    var Queries = require('./queries.api.28.io').Queries;
    var Datasources = require('./datasources.api.28.io').Datasources;
    var Modules = require('./modules.api.28.io').Modules;

    var getProjectAPI = function(name) {
        return location.protocol + '//' + name + '.' + PROJECT_DOMAIN + '/' + this.API_VERSION;
    };

    return {
        PORTAL_URL: config.PORTAL_URL,
        API_URL: config.API_URL,
        
        Auth: new Auth(config.API_URL),
        Project: new Project(config.API_URL),
        Queries: function(name) {
            return new Queries(getProjectAPI(name));
        },
        Datasources: function(name) {
            return new Datasources(getProjectAPI(name));
        },
        Modules: function(name) {
            return new Module(getProjectAPI(name));
        }
    };
};
