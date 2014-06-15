module.exports.Modules = function(domain) {
    'use strict';

    var request = require('request');
    var Q = require('Q');

    this.listModules = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_modules';
        var qs = {};
        var headers = {};
        qs.startsWith = parameters.startsWith;
        qs.includeSystem = parameters.includeSystem;
        qs.includeNs = parameters.includeNs;
        qs.includeSrc = parameters.includeSrc;
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        request({
            method: 'GET',
            uri: domain + path,
            qs: qs,
            headers: headers,
            body: body
        }, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                deferred.resolve({
                    response: response,
                    body: body
                });
            } else {
                deferred.reject({
                    response: response,
                    body: body
                });
            }
        });
        return deferred.promise;
    };

    this.getModule = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_modules/{module-path}';
        var qs = {};
        var headers = {};
        if (parameters.modulePath === undefined) {
            deferred.reject('Missing required path parameter: modulePath');
        }
        path = path.replace('{module-path}', parameters.modulePath);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        request({
            method: 'GET',
            uri: domain + path,
            qs: qs,
            headers: headers,
            body: body
        }, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                deferred.resolve({
                    response: response,
                    body: body
                });
            } else {
                deferred.reject({
                    response: response,
                    body: body
                });
            }
        });
        return deferred.promise;
    };

    this.createModule = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_modules/{module-path}';
        var qs = {};
        var headers = {};
        if (parameters.modulePath === undefined) {
            deferred.reject('Missing required path parameter: modulePath');
        }
        path = path.replace('{module-path}', parameters.modulePath);
        qs.compile = parameters.compile;
        qs.extension = parameters.extension;
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        var body = parameters.moduleBody;
        headers['Content-Type'] = parameters.contentType;
        request({
            method: 'POST',
            uri: domain + path,
            qs: qs,
            headers: headers,
            body: body
        }, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                deferred.resolve({
                    response: response,
                    body: body
                });
            } else {
                deferred.reject({
                    response: response,
                    body: body
                });
            }
        });
        return deferred.promise;
    };

    this.saveModule = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_modules/{module-path}';
        var qs = {};
        var headers = {};
        if (parameters.modulePath === undefined) {
            deferred.reject('Missing required path parameter: modulePath');
        }
        path = path.replace('{module-path}', parameters.modulePath);
        qs.compile = parameters.compile;
        qs.extension = parameters.extension;
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        var body = parameters.moduleBody;
        headers['Content-Type'] = parameters.contentType;
        request({
            method: 'PUT',
            uri: domain + path,
            qs: qs,
            headers: headers,
            body: body
        }, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                deferred.resolve({
                    response: response,
                    body: body
                });
            } else {
                deferred.reject({
                    response: response,
                    body: body
                });
            }
        });
        return deferred.promise;
    };

    this.removeModule = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_modules/{module-path}';
        var qs = {};
        var headers = {};
        if (parameters.modulePath === undefined) {
            deferred.reject('Missing required path parameter: modulePath');
        }
        path = path.replace('{module-path}', parameters.modulePath);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        request({
            method: 'DELETE',
            uri: domain + path,
            qs: qs,
            headers: headers,
            body: body
        }, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                deferred.resolve({
                    response: response,
                    body: body
                });
            } else {
                deferred.reject({
                    response: response,
                    body: body
                });
            }
        });
        return deferred.promise;
    };
};