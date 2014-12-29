/*jshint -W069 */
/**
 * <p>These resources can be used to manage and explore data sources. The endpoint of these resources is based on your project name. For instance, if your 28.io project is named <code>myproject</code>, your endpoint for this API will be will be: <code>http://myproject.28.io/v1/_datasources</code>.</p>
 * @class Datasources
 * @param {string} domain - The project domain
 */
var Datasources = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Datasources(domain) {
        this.domain = domain;
    }

    /**
     * Lists all data sources
     * @method
     * @name Datasources#listDatasources
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.listDatasources = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

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

        request({
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Lists all data sources in a specific category
     * @method
     * @name Datasources#listCategoryDatasources
     * @param {{string}} category - The data source category.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.listCategoryDatasources = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
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

        request({
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Creates a new data source
     * @method
     * @name Datasources#createDatasource
     * @param {{string}} category - The data source category.
     * @param {{string}} name - The name of the data source. The data source name can contain any alphabetic letter, numbers, dots, or dashes, and must start with an alphabetic letter.
     * @param {{string}} token - A project token.
     * @param {{boolean}} default - Whether the new data source will be the default one for its category. The default value is false.
     * @param {{string}} credentials - The data sources credentials as JSON.
     *
     */
    Datasources.prototype.createDatasource = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['name'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: name'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['default'] !== undefined) {
            queryParameters['default'] = parameters['default'];
        }

        if (parameters.credentials !== undefined) {
            body = parameters['credentials'];
        }

        if (parameters['credentials'] === undefined) {
            deferred.reject(new Error('Missing required body parameter: credentials'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        request({
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Retrieves a data source credentials
     * @method
     * @name Datasources#getDatasource
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.getDatasource = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
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

        request({
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Updates a data source
     * @method
     * @name Datasources#updateDatasource
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} token - A project token.
     * @param {{string}} name - The new name of the data source. If not specified the data source is not renamed.
     * @param {{boolean}} default - Whether the data source should become (if true) or cease to be (if false) the default one for its category. If not specified the data source does not change its default status.
     * @param {{string}} credentials - The new data sources credentials as JSON. If not specified the data sources credentials are not changed
     *
     */
    Datasources.prototype.updateDatasource = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['default'] !== undefined) {
            queryParameters['default'] = parameters['default'];
        }

        if (parameters.credentials !== undefined) {
            body = parameters['credentials'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        request({
            method: 'PATCH',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Removes a data source
     * @method
     * @name Datasources#removeDatasource
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.removeDatasource = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
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

        request({
            method: 'DELETE',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * List available collections
     * @method
     * @name Datasources#getDatasourceContents
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.getDatasourceContents = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
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

        request({
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Creates collection
     * @method
     * @name Datasources#createCollection
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} name - The name of the new collection.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.createCollection = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['name'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: name'));
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

        request({
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Retrieves metadata about a collection
     * @method
     * @name Datasources#getCollectionMetadata
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} collection - The collection name.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.getCollectionMetadata = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        path = path.replace('{collection}', parameters['collection']);

        if (parameters['collection'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: collection'));
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

        request({
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Removes a collection
     * @method
     * @name Datasources#removeCollection
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} collection - The collection name.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.removeCollection = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        path = path.replace('{collection}', parameters['collection']);

        if (parameters['collection'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: collection'));
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

        request({
            method: 'DELETE',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Lists collection items
     * @method
     * @name Datasources#listCollection
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} collection - The collection name.
     * @param {{string}} token - A project token.
     * @param {{integer}} offset - The index of the first item from which to start listing the collection items. Default is 1.
     * @param {{integer}} limit - The number of collection items to list. Default is 10.
     * @param {{boolean}} expand - Whether to include the serialized item in the listing. The default value is false.
     * @param {{string}} accept - Serialization format.
     *
     */
    Datasources.prototype.listCollection = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        path = path.replace('{collection}', parameters['collection']);

        if (parameters['collection'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: collection'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['expand'] !== undefined) {
            queryParameters['expand'] = parameters['expand'];
        }

        if (parameters.accept !== undefined) {
            headers['Accept'] = parameters['accept'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        request({
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Inserts an item into a collection
     * @method
     * @name Datasources#insertInCollection
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} collection - The collection name.
     * @param {{string}} token - A project token.
     * @param {{string}} item - The item to insert.
     *
     */
    Datasources.prototype.insertInCollection = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        path = path.replace('{collection}', parameters['collection']);

        if (parameters['collection'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: collection'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters.item !== undefined) {
            body = parameters['item'];
        }

        if (parameters['item'] === undefined) {
            deferred.reject(new Error('Missing required body parameter: item'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        request({
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Truncates a collection
     * @method
     * @name Datasources#truncateCollection
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} collection - The collection name.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.truncateCollection = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        path = path.replace('{collection}', parameters['collection']);

        if (parameters['collection'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: collection'));
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

        request({
            method: 'DELETE',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Retrieves a collection item
     * @method
     * @name Datasources#getItem
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} collection - The collection name.
     * @param {{string}} identifier - The item identifier.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.getItem = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        path = path.replace('{collection}', parameters['collection']);

        if (parameters['collection'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: collection'));
            return deferred.promise;
        }

        path = path.replace('{identifier}', parameters['identifier']);

        if (parameters['identifier'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: identifier'));
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

        request({
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Updates a collection item
     * @method
     * @name Datasources#updateItem
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} collection - The collection name.
     * @param {{string}} identifier - The item identifier.
     * @param {{string}} token - A project token.
     * @param {{string}} item - The new item.
     *
     */
    Datasources.prototype.updateItem = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        path = path.replace('{collection}', parameters['collection']);

        if (parameters['collection'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: collection'));
            return deferred.promise;
        }

        path = path.replace('{identifier}', parameters['identifier']);

        if (parameters['identifier'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: identifier'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters.item !== undefined) {
            body = parameters['item'];
        }

        if (parameters['item'] === undefined) {
            deferred.reject(new Error('Missing required body parameter: item'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        request({
            method: 'PUT',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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
     * Removes an item from a collection
     * @method
     * @name Datasources#removeItem
     * @param {{string}} category - The data source category.
     * @param {{string}} datasource - The data source name.
     * @param {{string}} collection - The collection name.
     * @param {{string}} identifier - The item identifier.
     * @param {{string}} token - A project token.
     *
     */
    Datasources.prototype.removeItem = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{category}', parameters['category']);

        if (parameters['category'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: category'));
            return deferred.promise;
        }

        path = path.replace('{datasource}', parameters['datasource']);

        if (parameters['datasource'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: datasource'));
            return deferred.promise;
        }

        path = path.replace('{collection}', parameters['collection']);

        if (parameters['collection'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: collection'));
            return deferred.promise;
        }

        path = path.replace('{identifier}', parameters['identifier']);

        if (parameters['identifier'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: identifier'));
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

        request({
            method: 'DELETE',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
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

    return Datasources;
})();

exports.Datasources = Datasources;