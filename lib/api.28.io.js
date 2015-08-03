exports.$28 = function(API_URL){
    'use strict';

    var isIP = false;
    var PROTOCOL = API_URL.substring(0, API_URL.indexOf('//'));

    var PROJECT_DOMAIN = API_URL.substring(API_URL.indexOf('//') + '//'.length);
    if(!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(PROJECT_DOMAIN))) {
        PROJECT_DOMAIN = PROJECT_DOMAIN.split('/')[0].split('.').slice(1).join('.');
    } else {
        isIP = true;
    }

    var Auth = require('./auth.api.28.io').Auth;
    var Project = require('./project.api.28.io').Project;
    var Queries = require('./queries.api.28.io').Queries;
    var Batch = require('./batch.api.28.io').Batch;
    var Datasources = require('./datasources.api.28.io').Datasources;
    var Modules = require('./modules.api.28.io').Modules;

    var getProjectAPI = function(name) {
        if(isIP) {
            return PROTOCOL + '//' + PROJECT_DOMAIN + '/' + name + '/v1';
        } else {
            return PROTOCOL + '//' + name + '.' + PROJECT_DOMAIN + '/v1';
        }
    };

    return {
        Auth: new Auth(API_URL),
        Project: new Project(API_URL),
        Queries: function(name) {
            return new Queries(getProjectAPI(name));
        },
        Batch: function(name) {
            return new Batch(getProjectAPI(name));
        },
        Datasources: function(name) {
            return new Datasources(getProjectAPI(name));
        },
        Modules: function(name) {
            return new Modules(getProjectAPI(name));
        }
    };
};
