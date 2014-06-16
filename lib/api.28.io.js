exports.$28 = function(API_URL){
    'use strict';

    var PROTOCOL = API_URL.substring(0, API_URL.indexOf('//')); 
    var PROJECT_DOMAIN = API_URL.substring(API_URL.indexOf('//') + '//'.length).split('/')[0].split('.').slice(1).join('.');

    var Auth = require('./auth.api.28.io').Auth;
    var Project = require('./project.api.28.io').Project;
    var Queries = require('./queries.api.28.io').Queries;
    var Datasources = require('./datasources.api.28.io').Datasources;
    var Modules = require('./modules.api.28.io').Modules;

    var getProjectAPI = function(name) {
        return PROTOCOL + '//' + name + '.' + PROJECT_DOMAIN + '/v1';
    };

    return {
        Auth: new Auth(API_URL),
        Project: new Project(API_URL),
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
