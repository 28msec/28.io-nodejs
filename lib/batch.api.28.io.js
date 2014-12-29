/*jshint -W069 */
/**
 * <p>These resources can be used to perform batch operations. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_batch</code>.</p>
 * @class Batch
 * @param {string} domain - The project domain
 */
var Batch = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Batch(domain) {
        this.domain = domain;
    }

    /**
     * Import project contents from an archive
     * @method
     * @name Batch#importProject
     * @param {{string}} url - The archive url.
     * @param {{string}} archive - The archive contents.
     * @param {{string}} root - The path inside the archive that contains the modules and queries folders. Use '/' as folder separator.
     * @param {{string}} overwrite - Whether to overwrite current project queries and modules. Default is true.
     * @param {{boolean}} deleteOrphaned - Whether to delete orphaned file or not. Default is false.
     * @param {{boolean}} simulate - Whether to simulate the operation or not. Default is false.
     * @param {{string}} token - A project token.
     * @param {{string}} contentType - <p>These resources can be used to perform batch operations. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_batch</code>.</p>
     *
     */
    Batch.prototype.importProject = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_batch/project';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['url'] !== undefined) {
            queryParameters['url'] = parameters['url'];
        }

        if (parameters.archive !== undefined) {
            body = parameters['archive'];
        }

        if (parameters['root'] !== undefined) {
            queryParameters['root'] = parameters['root'];
        }

        if (parameters['overwrite'] !== undefined) {
            queryParameters['overwrite'] = parameters['overwrite'];
        }

        if (parameters['deleteOrphaned'] !== undefined) {
            queryParameters['delete-orphaned'] = parameters['deleteOrphaned'];
        }

        if (parameters['simulate'] !== undefined) {
            queryParameters['simulate'] = parameters['simulate'];
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters.contentType !== undefined) {
            headers['Content-Type'] = parameters['contentType'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'PUT',
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

    return Batch;
})();

exports.Batch = Batch;