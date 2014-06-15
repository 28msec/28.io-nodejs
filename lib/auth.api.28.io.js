module.exports.Auth = function(domain) {
    'use strict';

    var request = require('request');
    var Q = require('Q');

    this.authenticate = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/auth';
        var qs = {};
        var headers = {};
        if (parameters.grant_type === undefined) {
            deferred.reject('Missing required query parameter: grant_type');
        }
        qs.grant_type = parameters.grant_type;
        qs.email = parameters.email;
        qs.password = parameters.password;
        qs.refresh_token = parameters.refresh_token;
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
};