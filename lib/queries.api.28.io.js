/*jshint -W069 */
/**
 * <p>These resources can be used to manage and execute queries. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be: <code>http://myproject.28.io/v1/_queries</code>.</p>
 * @class Queries
 * @param {string} domain - The project domain
 */
var Queries = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Queries(domain) {
        this.domain = domain;
    }

    /**
     * Lists public and/or private queries
     * @method
     * @name Queries#listQueries
     * @param {{string}} visibility - The query visibility.
     * @param {{string}} token - A project token.
     *
     */
    Queries.prototype.listQueries = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{visibility}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{visibility}', parameters['visibility']);

        if (parameters['visibility'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: visibility'));
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
        if (form) {
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
     * Executes a non-side-effecting query
     * @method
     * @name Queries#executeSimpleQuery
     * @param {{string}} accept - Value of the Accept header.
     * @param {{string}} queryPath - The query path. It starts with <code>public</code> or <code>private</code> and can contain slashes.
     * @param {{string}} format - The serialization method to use for the results of the executed query. When choosing a serialization method, this parameter has a lower priority than the <code>Accept</code> header.
     * @param {{boolean}} trace - Whether to enable the output of trace#2.
     * @param {{string}} token - A project token.
     *
     */
    Queries.prototype.executeSimpleQuery = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{query-path}{format}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.accept !== undefined) {
            headers['Accept'] = parameters['accept'];
        }

        path = path.replace('{query-path}', parameters['queryPath']);

        if (parameters['queryPath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: queryPath'));
            return deferred.promise;
        }

        path = path.replace('{format}', parameters['format']);

        if (parameters['trace'] !== undefined) {
            queryParameters['trace'] = parameters['trace'];
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
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
        if (form) {
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
     * Executes a query
     * @method
     * @name Queries#executeQuery
     * @param {{string}} accept - Value of the Accept header.
     * @param {{string}} queryPath - The query path. It starts with <code>public</code> or <code>private</code> and can contain slashes.
     * @param {{string}} format - The serialization method to use for the results of the executed query. When choosing a serialization method, this parameter has a lower priority than the <code>Accept</code> header.
     * @param {{boolean}} async - Whether to execute the query asynchronously or not.
     * @param {{string}} outputCollection - The output collection when runnng the query asynchronously.
     * @param {{boolean}} trace - Whether to enable the output trace#2.
     * @param {{string}} token - A project token.
     *
     */
    Queries.prototype.executeQuery = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{query-path}{format}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters.accept !== undefined) {
            headers['Accept'] = parameters['accept'];
        }

        path = path.replace('{query-path}', parameters['queryPath']);

        if (parameters['queryPath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: queryPath'));
            return deferred.promise;
        }

        path = path.replace('{format}', parameters['format']);

        if (parameters['async'] !== undefined) {
            queryParameters['async'] = parameters['async'];
        }

        if (parameters['outputCollection'] !== undefined) {
            queryParameters['output-collection'] = parameters['outputCollection'];
        }

        if (parameters['trace'] !== undefined) {
            queryParameters['trace'] = parameters['trace'];
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
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
        if (form) {
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
     * Retrieves a query source code
     * @method
     * @name Queries#getQuery
     * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
     * @param {{string}} token - A project token.
     *
     */
    Queries.prototype.getQuery = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{query-path}/metadata/source';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{query-path}', parameters['queryPath']);

        if (parameters['queryPath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: queryPath'));
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
        if (form) {
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
     * Creates a new query
     * @method
     * @name Queries#createQuery
     * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
     * @param {{string}} token - A project token.
     * @param {{string}} compile - The kind of compilation to perform. The default is none.
     * @param {{string}} queryBody - The source code of the query

     * 
     */
    Queries.prototype.createQuery = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{query-path}/metadata/source';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{query-path}', parameters['queryPath']);

        if (parameters['queryPath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: queryPath'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['compile'] !== undefined) {
            queryParameters['compile'] = parameters['compile'];
        }

        if (parameters.queryBody !== undefined) {
            body = parameters['queryBody'];
        }

        if (parameters['queryBody'] === undefined) {
            deferred.reject(new Error('Missing required body parameter: queryBody'));
            return deferred.promise;
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
        if (form) {
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
     * Creates or updates a query
     * @method
     * @name Queries#saveQuery
     * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
     * @param {{string}} token - A project token.
     * @param {{string}} compile - The kind of compilation to perform. The default is none.
     * @param {{string}} queryBody - The query source code

     * 
     */
    Queries.prototype.saveQuery = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{query-path}/metadata/source';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{query-path}', parameters['queryPath']);

        if (parameters['queryPath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: queryPath'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['compile'] !== undefined) {
            queryParameters['compile'] = parameters['compile'];
        }

        if (parameters.queryBody !== undefined) {
            body = parameters['queryBody'];
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
        if (form) {
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
     * Removes a query
     * @method
     * @name Queries#removeQuery
     * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
     * @param {{string}} token - A project token.
     *
     */
    Queries.prototype.removeQuery = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{query-path}/metadata/source';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{query-path}', parameters['queryPath']);

        if (parameters['queryPath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: queryPath'));
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
        if (form) {
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
     * Retrieves a query execution plan
     * @method
     * @name Queries#getQueryPlan
     * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
     * @param {{string}} token - A project token.
     *
     */
    Queries.prototype.getQueryPlan = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{query-path}/metadata/plan';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{query-path}', parameters['queryPath']);

        if (parameters['queryPath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: queryPath'));
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
        if (form) {
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
     * Precompiles a query
     * @method
     * @name Queries#compileQuery
     * @param {{string}} queryPath - The query path. It starts with "public" or "private" and contains slashes.
     * @param {{string}} token - A project token.
     *
     */
    Queries.prototype.compileQuery = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_queries/{query-path}/metadata/plan';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{query-path}', parameters['queryPath']);

        if (parameters['queryPath'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: queryPath'));
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
            method: 'PUT',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            rejectUnauthorized: false
        };
        if (form) {
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

    return Queries;
})();

exports.Queries = Queries;