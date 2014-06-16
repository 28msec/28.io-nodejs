module.exports.Queries = function(domain) {
    'use strict';

    var request = require('request');
    var Q = require('q');

    this.listQueries = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{visibility}';
        var qs = {};
        var headers = {};
        if (parameters.visibility === undefined) {
            deferred.reject('Missing required path parameter: visibility');
        }
        path = path.replace('{visibility}', parameters.visibility);
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
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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

    this.executeSimpleQuery = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{query-path}{format}';
        var qs = {};
        var headers = {};
        headers['Accept'] = parameters.accept;
        if (parameters.queryPath === undefined) {
            deferred.reject('Missing required path parameter: queryPath');
        }
        path = path.replace('{query-path}', parameters.queryPath);
        path = path.replace('{format}', parameters.format);
        qs.trace = parameters.trace;
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
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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

    this.executeQuery = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{query-path}{format}';
        var qs = {};
        var headers = {};
        headers['Accept'] = parameters.accept;
        if (parameters.queryPath === undefined) {
            deferred.reject('Missing required path parameter: queryPath');
        }
        path = path.replace('{query-path}', parameters.queryPath);
        path = path.replace('{format}', parameters.format);
        qs.async = parameters.async;
        qs.outputCollection = parameters.outputCollection;
        qs.trace = parameters.trace;
        qs.token = parameters.token;
        request({
            method: 'POST',
            uri: domain + path,
            qs: qs,
            headers: headers,
            body: body
        }, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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

    this.getQuery = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{query-path}/metadata/source';
        var qs = {};
        var headers = {};
        if (parameters.queryPath === undefined) {
            deferred.reject('Missing required path parameter: queryPath');
        }
        path = path.replace('{query-path}', parameters.queryPath);
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
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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

    this.createQuery = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{query-path}/metadata/source';
        var qs = {};
        var headers = {};
        if (parameters.queryPath === undefined) {
            deferred.reject('Missing required path parameter: queryPath');
        }
        path = path.replace('{query-path}', parameters.queryPath);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        qs.compile = parameters.compile;
        if (parameters.queryBody === undefined) {
            deferred.reject('Missing required body parameter: queryBody');
        }
        body = parameters.queryBody;
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
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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

    this.saveQuery = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{query-path}/metadata/source';
        var qs = {};
        var headers = {};
        if (parameters.queryPath === undefined) {
            deferred.reject('Missing required path parameter: queryPath');
        }
        path = path.replace('{query-path}', parameters.queryPath);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        qs.compile = parameters.compile;
        body = parameters.queryBody;
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
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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

    this.removeQuery = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{query-path}/metadata/source';
        var qs = {};
        var headers = {};
        if (parameters.queryPath === undefined) {
            deferred.reject('Missing required path parameter: queryPath');
        }
        path = path.replace('{query-path}', parameters.queryPath);
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
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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

    this.getQueryPlan = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{query-path}/metadata/plan';
        var qs = {};
        var headers = {};
        if (parameters.queryPath === undefined) {
            deferred.reject('Missing required path parameter: queryPath');
        }
        path = path.replace('{query-path}', parameters.queryPath);
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
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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

    this.compileQuery = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/_queries/{query-path}/metadata/plan';
        var qs = {};
        var headers = {};
        if (parameters.queryPath === undefined) {
            deferred.reject('Missing required path parameter: queryPath');
        }
        path = path.replace('{query-path}', parameters.queryPath);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        request({
            method: 'PUT',
            uri: domain + path,
            qs: qs,
            headers: headers,
            body: body
        }, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
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
};