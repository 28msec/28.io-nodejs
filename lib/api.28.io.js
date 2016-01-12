exports.$28 = function(API_URL){
    'use strict';

    var Auth = require('./auth.api.28.io').Auth;
    var Project = require('./project.api.28.io').Project;
    var Queries = require('./queries.api.28.io').Queries;
    var Batch = require('./batch.api.28.io').Batch;
    var Datasources = require('./datasources.api.28.io').Datasources;
    var Modules = require('./modules.api.28.io').Modules;
    var Account = require('./account.api.28.io').Account;

    return {
        Auth: new Auth(API_URL),
        Project: new Project(API_URL),
        Account: new Account(API_URL),
        Queries: function(endpoint) {
            return new Queries(endpoint);
        },
        Batch: function(endpoint) {
            return new Batch(endpoint);
        },
        Datasources: function(endpoint) {
            return new Datasources(endpoint);
        },
        Modules: function(endpoint) {
            return new Modules(endpoint);
        }
    };
};
