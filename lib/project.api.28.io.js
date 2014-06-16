module.exports.Project = function(domain) {
    'use strict';

    var request = require('request');
    var Q = require('q');

    this.listProjects = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project';
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

    this.createProject = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project';
        var qs = {};
        var headers = {};
        if (parameters.projectName === undefined) {
            deferred.reject('Missing required query parameter: projectName');
        }
        qs.projectName = parameters.projectName;
        qs.template = parameters.template;
        qs.package = parameters.package;
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

    this.checkProject = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
        request({
            method: 'HEAD',
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

    this.getProjectMetadata = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
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

    this.upgradeProject = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
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

    this.updateProject = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
        qs.newName = parameters.newName;
        qs.package = parameters.package;
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        request({
            method: 'PATCH',
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

    this.deleteProject = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
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

    this.getDefaultMongoDBCredentials = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}/default-mongodb';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
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

    this.updateDefaultMongoDBCredentials = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}/default-mongodb';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        if (parameters.dbType === undefined) {
            deferred.reject('Missing required query parameter: dbType');
        }
        qs.dbType = parameters.dbType;
        qs.connString = parameters.connString;
        qs.db = parameters.db;
        qs.user = parameters.user;
        qs.pass = parameters.pass;
        qs.preDigested = parameters.preDigested;
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

    this.testDefaultMongoDB = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}/test-mongodb';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
        if (parameters.token === undefined) {
            deferred.reject('Missing required query parameter: token');
        }
        qs.token = parameters.token;
        if (parameters.connString === undefined) {
            deferred.reject('Missing required query parameter: connString');
        }
        qs.connString = parameters.connString;
        if (parameters.db === undefined) {
            deferred.reject('Missing required query parameter: db');
        }
        qs.db = parameters.db;
        qs.user = parameters.user;
        qs.pass = parameters.pass;
        qs.preDigested = parameters.preDigested;
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

    this.listCustomDomains = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}/domains';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
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

    this.addCustomDomain = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}/domains';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
        if (parameters.domainName === undefined) {
            deferred.reject('Missing required query parameter: domainName');
        }
        qs.domainName = parameters.domainName;
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

    this.deleteCustomDomain = function(parameters) {
        var deferred = Q.defer();
        var body;
        var path = '/project/{name}/domains/{domain-name}';
        var qs = {};
        var headers = {};
        if (parameters.name === undefined) {
            deferred.reject('Missing required path parameter: name');
        }
        path = path.replace('{name}', parameters.name);
        if (parameters.domainName === undefined) {
            deferred.reject('Missing required path parameter: domainName');
        }
        path = path.replace('{domain-name}', parameters.domainName);
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
};