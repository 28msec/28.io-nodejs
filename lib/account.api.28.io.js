/*jshint -W069 */
/**
 * 
 * @class Account
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Account = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Account(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'http://api.xbrl.io';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    /**
     * Creates a new account
     * @method
     * @name Account#createAccount
     * @param {string} firstname - The account first name.
     * @param {string} lastname - The account last name.
     * @param {string} company - The account company.
     * @param {string} email - The account email.
     * @param {string} password - The account password.
     * 
     */
    Account.prototype.createAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['firstname'] !== undefined) {
            queryParameters['firstname'] = parameters['firstname'];
        }

        if (parameters['firstname'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: firstname'));
            return deferred.promise;
        }

        if (parameters['lastname'] !== undefined) {
            queryParameters['lastname'] = parameters['lastname'];
        }

        if (parameters['lastname'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: lastname'));
            return deferred.promise;
        }

        if (parameters['company'] !== undefined) {
            queryParameters['company'] = parameters['company'];
        }

        if (parameters['company'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: company'));
            return deferred.promise;
        }

        if (parameters['email'] !== undefined) {
            queryParameters['email'] = parameters['email'];
        }

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: email'));
            return deferred.promise;
        }

        if (parameters['password'] !== undefined) {
            queryParameters['password'] = parameters['password'];
        }

        if (parameters['password'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: password'));
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
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Checks if an account exists
     * @method
     * @name Account#checkAccount
     * @param {string} email - The account email.
     * 
     */
    Account.prototype.checkAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
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
            method: 'HEAD',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Retrieves an account metadata
     * @method
     * @name Account#getAccountMetadata
     * @param {string} email - The account email.
     * @param {string} token - An API token generated for the specified account.
     * 
     */
    Account.prototype.getAccountMetadata = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Updates an account
     * @method
     * @name Account#updateAccount
     * @param {string} email - The account email.
     * @param {string} token - An API token generated for the specified account.
     * @param {string} firstname - The account new first name. If not specified the account firstname is not modified.
     * @param {string} lastname - The account new last name. If not specified the account lastname is not modified.
     * @param {string} company - The account new company. If not specified the account company is not modified.
     * @param {string} password - The account new password. If not specified the account password is not modified.
     * 
     */
    Account.prototype.updateAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['firstname'] !== undefined) {
            queryParameters['firstname'] = parameters['firstname'];
        }

        if (parameters['lastname'] !== undefined) {
            queryParameters['lastname'] = parameters['lastname'];
        }

        if (parameters['company'] !== undefined) {
            queryParameters['company'] = parameters['company'];
        }

        if (parameters['password'] !== undefined) {
            queryParameters['password'] = parameters['password'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'PATCH',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Resends the confirmation email
     * @method
     * @name Account#resendConfirmation
     * @param {string} email - The account email.
     * 
     */
    Account.prototype.resendConfirmation = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/confirm';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Confirms an account
     * @method
     * @name Account#confirmAccount
     * @param {string} email - The account name.
     * @param {string} confirmationToken - The account confirmation token.
     * 
     */
    Account.prototype.confirmAccount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/confirm';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        if (parameters['confirmationToken'] !== undefined) {
            queryParameters['confirmation-token'] = parameters['confirmationToken'];
        }

        if (parameters['confirmationToken'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: confirmationToken'));
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
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Checks if a reset token is valid
     * @method
     * @name Account#checkResetToken
     * @param {string} email - The account email.
     * @param {string} resetToken - The reset token to check.
     * 
     */
    Account.prototype.checkResetToken = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/reset';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        if (parameters['resetToken'] !== undefined) {
            queryParameters['reset-token'] = parameters['resetToken'];
        }

        if (parameters['resetToken'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: resetToken'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Changes an account password using a reset token
     * @method
     * @name Account#resetPassword
     * @param {string} email - The account email.
     * @param {string} resetToken - The latest account reset token.
     * @param {string} password - The new account password.
     * 
     */
    Account.prototype.resetPassword = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/reset';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        if (parameters['resetToken'] !== undefined) {
            queryParameters['reset-token'] = parameters['resetToken'];
        }

        if (parameters['resetToken'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: resetToken'));
            return deferred.promise;
        }

        if (parameters['password'] !== undefined) {
            queryParameters['password'] = parameters['password'];
        }

        if (parameters['password'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: password'));
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
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Sends a reset token
     * @method
     * @name Account#sendResetToken
     * @param {string} email - The account email.
     * @param {string} portalUrl - The Portal URL
     * 
     */
    Account.prototype.sendResetToken = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/reset';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        if (parameters['portalUrl'] !== undefined) {
            queryParameters['portal-url'] = parameters['portalUrl'];
        }

        if (parameters['portalUrl'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: portalUrl'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Retrieves the user billing data and the data required to update it
     * @method
     * @name Account#getBillingData
     * @param {string} email - The account email.
     * @param {string} token - An API token generated for the specified account.
     * 
     */
    Account.prototype.getBillingData = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/billing';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Lists the account invoices
     * @method
     * @name Account#listInvoices
     * @param {string} email - The account email.
     * @param {string} cursor - Used to control which page is returned. Leave empty for the first page. Use the cursor returned in a reply to fetch the next page.
     * @param {integer} limit - The number of records to return per page up to a maximum of 200. Default is 50.
     * @param {string} token - An API token generated for the specified account.
     * 
     */
    Account.prototype.listInvoices = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/invoices';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        if (parameters['cursor'] !== undefined) {
            queryParameters['cursor'] = parameters['cursor'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Retrieves the user billing information
     * @method
     * @name Account#getInvoice
     * @param {string} email - The account email.
     * @param {string} token - An API token generated for the specified account.
     * @param {string} Accept - The format of the response. Default is "application/pdf"
     * 
     */
    Account.prototype.getInvoice = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/invoices/{invoice}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['Accept'] !== undefined) {
            headers['Accept'] = parameters['Accept'];
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Lists the account subscriptions
     * @method
     * @name Account#listSubscriptions
     * @param {string} email - The account email.
     * @param {string} token - An API token generated for the specified account.
     * 
     */
    Account.prototype.listSubscriptions = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/subscriptions';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Creates a new subscription
     * @method
     * @name Account#createSubscription
     * @param {string} email - The account email.
     * @param {string} plan - The plan to subscribe to.
     * @param {integer} quantity - The quantity for the chosen plan.
     * @param {string} token - An API token generated for the specified account.
     * 
     */
    Account.prototype.createSubscription = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/subscriptions';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        if (parameters['plan'] !== undefined) {
            queryParameters['plan'] = parameters['plan'];
        }

        if (parameters['plan'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: plan'));
            return deferred.promise;
        }

        if (parameters['quantity'] !== undefined) {
            queryParameters['quantity'] = parameters['quantity'];
        }

        if (parameters['quantity'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: quantity'));
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
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Retrieves the subscription details
     * @method
     * @name Account#getSubscription
     * @param {string} email - The account email.
     * @param {string} subscription - The subscription uuid.
     * @param {string} token - An API token generated for the specified account.
     * 
     */
    Account.prototype.getSubscription = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/subscriptions/{subscription}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        path = path.replace('{subscription}', parameters['subscription']);

        if (parameters['subscription'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: subscription'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Updates a subscription
     * @method
     * @name Account#updateSubscription
     * @param {string} email - The account email.
     * @param {string} subscription - The subscription uuid.
     * @param {integer} quantity - The new quantity.
     * @param {string} token - An API token generated for the specified account.
     * 
     */
    Account.prototype.updateSubscription = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/subscriptions/{subscription}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        path = path.replace('{subscription}', parameters['subscription']);

        if (parameters['subscription'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: subscription'));
            return deferred.promise;
        }

        if (parameters['quantity'] !== undefined) {
            queryParameters['quantity'] = parameters['quantity'];
        }

        if (parameters['quantity'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: quantity'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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
     * Terminates a subscription
     * @method
     * @name Account#terminateSubscription
     * @param {string} email - The account email.
     * @param {string} subscription - The subscription uuid.
     * @param {string} token - An API token generated for the specified account.
     * 
     */
    Account.prototype.terminateSubscription = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/account/{email}/subscriptions/{subscription}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{email}', parameters['email']);

        if (parameters['email'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: email'));
            return deferred.promise;
        }

        path = path.replace('{subscription}', parameters['subscription']);

        if (parameters['subscription'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: subscription'));
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
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !body instanceof Buffer) {
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

    return Account;
})();

exports.Account = Account;