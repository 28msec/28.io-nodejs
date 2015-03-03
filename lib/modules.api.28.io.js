/*jshint -W069 */
/**
 * <p>These resources can be used to manage JSONiq and XQuery <a href="http://www.w3.org/TR/xquery-30/#dt-library-module" target="_blank">library modules</a>. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_modules</code>.</p><p class='callout-warning'>This API does not allow to retrieve the source code, modify or delete system modules.</p>
 * @class Modules
 * @param {string} domain - The project domain
 */
var Modules = (function() {
    'use strict';

    var standardRequest = require('request');
    var request;
    var Q = require('q');
    var _ = require('lodash');

    function Modules(domain, requestDefaults) {
        this.domain = domain;
        if(_.isObject(requestDefaults)){
            request = standardRequest.defaults(requestDefaults);
        } else {
            request = standardRequest;
        }
    }

    /**
     * Lists available modules
     * @method
     * @name Modules#listModules
     * @param {{string}} startsWith - Filter the available module by their module path.
     * @param {{boolean}} includeSystem - Include modules provided by the platform.
     * @param {{boolean}} includeNs - Include each module's namespace in the listing.
     * @param {{boolean}} includeSrc - Include each module's source code in the listing.
     * @param {{string}} token - A project token.
     *
     */
    Modules.prototype.listModules = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_modules';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['startsWith'] !== undefined) {
            queryParameters['starts-with'] = parameters['startsWith'];
        }

        if (parameters['includeSystem'] !== undefined) {
            queryParameters['include-system'] = parameters['includeSystem'];
        }

        if (parameters['includeNs'] !== undefined) {
            queryParameters['include-ns'] = parameters['includeNs'];
        }

        if (parameters['includeSrc'] !== undefined) {
            queryParameters['include-src'] = parameters['includeSrc'];
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
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
    /**
     * Retrieves the source code of the specified project module
     * @method
     * @name Modules#getModule
     * @param {{string}} modulePath - The module path.
     * @param {{string}} token - A project token.
     *
     */
    Modules.prototype.getModule = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_modules/{module-path}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{module-path}', parameters['modulePath']);

        if (parameters['modulePath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: modulePath'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
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
    /**
     * Creates a new project module
     * @method
     * @name Modules#createModule
     * @param {{string}} modulePath - The module path.
     * @param {{string}} compile - The kind of compilation to perform. The default is "lax".
     * @param {{string}} extension - The new module extension. The default is "jq".
     * @param {{string}} token - A project token.
     * @param {{string}} moduleBody - The source code of the module.

     * 
     */
    Modules.prototype.createModule = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_modules/{module-path}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{module-path}', parameters['modulePath']);

        if (parameters['modulePath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: modulePath'));
            return deferred.promise;
        }

        if (parameters['compile'] !== undefined) {
            queryParameters['compile'] = parameters['compile'];
        }

        if (parameters['extension'] !== undefined) {
            queryParameters['extension'] = parameters['extension'];
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters.moduleBody !== undefined) {
            body = parameters['moduleBody'];
        }

        headers['Content-Type'] = 'text/plain; charset=utf-8';

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
    /**
     * Creates or updates the specified project module
     * @method
     * @name Modules#saveModule
     * @param {{string}} modulePath - The module path.
     * @param {{string}} compile - The kind of compilation to perform. The default is "lax".
     * @param {{string}} extension - The new module extension. The default is "jq".
     * @param {{string}} token - A project token.
     * @param {{string}} moduleBody - The module source code

     * 
     */
    Modules.prototype.saveModule = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_modules/{module-path}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{module-path}', parameters['modulePath']);

        if (parameters['modulePath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: modulePath'));
            return deferred.promise;
        }

        if (parameters['compile'] !== undefined) {
            queryParameters['compile'] = parameters['compile'];
        }

        if (parameters['extension'] !== undefined) {
            queryParameters['extension'] = parameters['extension'];
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters.moduleBody !== undefined) {
            body = parameters['moduleBody'];
        }

        headers['Content-Type'] = 'text/plain; charset=utf-8';

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
    /**
     * Removes the specified project module
     * @method
     * @name Modules#removeModule
     * @param {{string}} modulePath - The module path.
     * @param {{string}} token - A project token.
     *
     */
    Modules.prototype.removeModule = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_modules/{module-path}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{module-path}', parameters['modulePath']);

        if (parameters['modulePath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: modulePath'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'DELETE',
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

    return Modules;
})();

exports.Modules = Modules;