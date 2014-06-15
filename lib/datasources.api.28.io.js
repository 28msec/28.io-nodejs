module.exports.Datasources = function(domain) {
    'use strict';

    var request = require('request');
    var Q = require('Q');

    this.listDatasources = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources';
        var qs = {};
        var headers = {};
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

    this.listCategoryDatasources = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
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

    this.createDatasource = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.name === undefined) {
            deferred.reject('Missing required query parameter: name');
        }
        qs.name = parameters.name;
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        qs.difault = parameters.difault;
        if (parameters.credentials === undefined) {
            deferred.reject('Missing required body parameter: credentials');
        }
        var body = parameters.credentials;
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

    this.getDatasource = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
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

    this.updateDatasource = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        qs.name = parameters.name;
        qs.difault = parameters.difault;
        var body = parameters.credentials;
        request({
            method: 'PATCH',
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

    this.removeDatasource = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
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

    this.getDatasourceContents = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
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

    this.createCollection = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.name === undefined) {
            deferred.reject('Missing required query parameter: name');
        }
        qs.name = parameters.name;
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
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

    this.getCollectionMetadata = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.collection === undefined) {
            deferred.reject('Missing required path parameter: collection');
        }
        path = path.replace('{collection}', parameters.collection);
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

    this.removeCollection = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.collection === undefined) {
            deferred.reject('Missing required path parameter: collection');
        }
        path = path.replace('{collection}', parameters.collection);
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

    this.listCollection = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.collection === undefined) {
            deferred.reject('Missing required path parameter: collection');
        }
        path = path.replace('{collection}', parameters.collection);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        qs.offset = parameters.offset;
        qs.limit = parameters.limit;
        qs.expand = parameters.expand;
        headers['Accept'] = parameters.accept;
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

    this.insertInCollection = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.collection === undefined) {
            deferred.reject('Missing required path parameter: collection');
        }
        path = path.replace('{collection}', parameters.collection);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        if (parameters.item === undefined) {
            deferred.reject('Missing required body parameter: item');
        }
        var body = parameters.item;
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

    this.truncateCollection = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.collection === undefined) {
            deferred.reject('Missing required path parameter: collection');
        }
        path = path.replace('{collection}', parameters.collection);
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

    this.getItem = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.collection === undefined) {
            deferred.reject('Missing required path parameter: collection');
        }
        path = path.replace('{collection}', parameters.collection);
        if (parameters.identifier === undefined) {
            deferred.reject('Missing required path parameter: identifier');
        }
        path = path.replace('{identifier}', parameters.identifier);
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

    this.updateItem = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.collection === undefined) {
            deferred.reject('Missing required path parameter: collection');
        }
        path = path.replace('{collection}', parameters.collection);
        if (parameters.identifier === undefined) {
            deferred.reject('Missing required path parameter: identifier');
        }
        path = path.replace('{identifier}', parameters.identifier);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        if (parameters.item === undefined) {
            deferred.reject('Missing required body parameter: item');
        }
        var body = parameters.item;
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

    this.removeItem = function(parameters) {
        var deferred = Q.defer();
        var body = undefined;
        var path = '/_datasources/{category}/{datasource}/contents/{collection}/items/{identifier}';
        var qs = {};
        var headers = {};
        if (parameters.category === undefined) {
            deferred.reject('Missing required path parameter: category');
        }
        path = path.replace('{category}', parameters.category);
        if (parameters.datasource === undefined) {
            deferred.reject('Missing required path parameter: datasource');
        }
        path = path.replace('{datasource}', parameters.datasource);
        if (parameters.collection === undefined) {
            deferred.reject('Missing required path parameter: collection');
        }
        path = path.replace('{collection}', parameters.collection);
        if (parameters.identifier === undefined) {
            deferred.reject('Missing required path parameter: identifier');
        }
        path = path.replace('{identifier}', parameters.identifier);
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