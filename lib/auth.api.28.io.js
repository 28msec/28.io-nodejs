/*jshint -W069 */
/**
 * <p>This OAuth2 compliant API can be used to authorize requests. The endpoint for these methods is <code>http://portal.28.io/auth</code>.</p>
 * @class Auth
 * @param {string} domain - The project domain
 */
var Auth = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Auth(domain) {
        this.domain = domain;
    }

    /**
     * Creates or refreshes authorization tokens
     * @method
     * @name Auth#authenticate
     * @param {{string}} grant_type - Authorization grant type. Use <code>client_credentials</code> to create a token or <code>refresh_token</code> to refresh a token
     * @param {{string}} email - The account email. Mandatory if <code>grant_type=client_credentials</code>.
     * @param {{string}} password - The account password. Mandatory if <code>grant_type=client_credentials</code>.
     * @param {{string}} refresh_token - The <code>refresh_token</code> obtained in the last successful request to this endpoint.  Mandatory if <code>grant_type=refresh_token</code>.
     *
     */
    Auth.prototype.authenticate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/auth';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['grant_type'] !== undefined) {
            queryParameters['grant_type'] = parameters['grant_type'];
        }

        if (parameters['grant_type'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: grant_type'));
            return deferred.promise;
        }

        if (parameters['email'] !== undefined) {
            queryParameters['email'] = parameters['email'];
        }

        if (parameters['password'] !== undefined) {
            queryParameters['password'] = parameters['password'];
        }

        if (parameters['refresh_token'] !== undefined) {
            queryParameters['refresh_token'] = parameters['refresh_token'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            rejectUnauthorized: false
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
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
            }
        });

        return deferred.promise;
    };

    return Auth;
})();

exports.Auth = Auth;