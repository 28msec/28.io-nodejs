/*jshint -W069 */
/**
 * <div><p>These resources can be used to manage projects.
         The endpoint of these resources is based on the portal URI and your project name. 
         For instance, if your 28.io project is named <code>myproject</code>, 
         your endpoint for this API will be will be: 
         <code>http://portal.28.io/api/myproject</code>.
      </p><p>An access token needs to be provided to methods that require authentication.
         An access token can be given in one of the following ways, ordered by priority:
         <ol><li><code>X-28msec-Token</code> header;</li><li><code>_token</code> query parameter;</li><li><code>token</code> query parameter.</li></ol></p><h2>Custom Rewrite Rules</h2><p>
         Custom rewrites rules allow to transform requests to your project, for instance, mapping GET requests to <pre>http://myproject.28.io/objects/{an-object-id}</pre>
         as GET requests to <pre>http://myproject.28.io/v1/_queries/public/get-object.jq?object-id={an-object-id}</pre>.
         This API works by exposing some of the features of the <a href="http://httpd.apache.org/docs/current/mod/mod_rewrite.html">Apache mod_rewrite</a> module.         
      </p><p>
         A rewrite rule is composed by an array of conditions (corresponding to mod_rewrite <a href="http://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewritecond">RewriteCond</a>
         directives) and a rewrite directive (corresponding to a single mod_rewrite 
         <a href="http://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewriterule">RewriteRule</a> directive).
      </p><h3>Conditions</h3><div><p>
			All the conditions that must be satisfied for the rewrite rule to be applied.
			Each condition allows to test a pattern on an Apache Server variable.
			The conditions semantics can be optionally specifying one or more test flags.
			For additional details refer to <a href="http://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewritecond">RewriteCond</a>.
        </p><p>
           For instance the following two conditions are satisfied when the request method is GET and when the request URI
           starts with <pre>/objects</pre>, as in <pre>GET http://myproject.28.io/objects/23</pre>.
           <pre>
[ 
  {
    "testVariable": "REQUEST_METHOD",
	"condPattern": "=GET"
  },
  {
    "testVariable": "ENV:28_REQUEST_URI",
	"condPattern": "^/objects/",
	"flags": ["NC"]
  }
]
		   </pre></p><p>
           The test variable must be chosen from the following subset of the Apache
			<a href="http://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewritecond">Server Variables</a>.
        </p><p>
           The list of allowed Apache variables is the following.
           <ul><li>HTTP Headers:
               <ul><li>HTTP_USER_AGENT</li><li>HTTP_REFERER</li><li>HTTP_COOKIE</li><li>HTTP_FORWARDED</li><li>HTTP_HOST</li><li>HTTP_PROXY_CONNECTION</li><li>HTTP_ACCEPT</li></ul></li><li>Server internals:
               <ul><li>SERVER_ADMIN</li><li>SERVER_NAME</li><li>SERVER_ADDR</li><li>SERVER_PORT</li><li>SERVER_PROTOCOL</li><li>SERVER_SOFTWARE</li></ul></li><li>Connection and request:
               <ul><li>REMOTE_ADDR</li><li>REMOTE_HOST</li><li>REMOTE_PORT</li><li>REMOTE_USER</li><li>REMOTE_IDENT</li><li>REQUEST_METHOD</li><li>REQUEST_URI</li><li>REQUEST_FILENAME</li><li>SCRIPT_FILENAME</li><li>PATH_INFO</li><li>QUERY_STRING</li><li>AUTH_TYPE</li></ul></li><li>Time:
               <ul><li>TIME_YEAR</li><li>TIME_MON</li><li>TIME_DAY</li><li>TIME_HOUR</li><li>TIME_MIN</li><li>TIME_SEC</li><li>TIME_WDAY</li><li>TIME</li></ul></li><li>Specials:
               <ul><li>API_VERSION</li><li>THE_REQUEST</li><li>IS_SUBREQ</li><li>HTTPS</li></ul></li></ul>
           Two additional 28msec-specific environment variables are defined which ease writing conditions: 
           <ul><li>ENV:28_REQUEST_URI: this is the request uri relative to the project root. For instance it is
                   set to <pre>/request</pre> for both these two requests: <pre>http://myproject.28.io/request</pre> and 
                   <pre>http://11.11.11.11/myproject/request</pre></li><li>ENV:28_PROJECT_BASE_URI: this is the base uri for the project, using the same addressing 
                   mechanism of the request. For instance, it is set to <pre>myproject.28.io</pre> for a request to 
                   <pre>http://myproject.28.io/request</pre>; and to <pre>11.11.11.11/myproject</pre> for a request to 
                   <pre>http://11.11.11.11/myproject/request</pre></li></ul></p><p>
            The condition pattern supports the following restriction of the
            <a href="http://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewritecond">mod_rewrite</a> 
            condition pattern specification:
            <ul><li>Regular expressions (e.g. <pre>^/objects/</pre>) are always allowed</li><li>Negation using the <pre>!</pre> character at the beginning of the pattern is always allowed</li><li>Lexicographical string comparison (e.g.: &lt;CondPattern) is always allowed</li><li>Integer comparison (e.g.: -eq 28) is always allowed</li><li>File attribute tests (e.g.: -f) are allowed only for the <pre>REQUEST_FILENAME</pre> variable</li><li>Variable references within the condition pattern is limited to the previous variable list</li></ul></p></div><h4>Rewrite</h4><div><p>
			The rewrite specifies the transformation to be applied. It contains the pattern to be evaluated against the 
			current request and the substitution to perform if the pattern matches.  
			For additional details refer to <a href="http://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewriterule">RewriteRule</a>.			
        </p><p>
           For instance the following rewrite transforms a request to <pre>http://myproject.28.io/objects/23</pre> to 
           a request to <pre>http://myproject.28.io/v1/_queries/public/get-object.jq?object-id=23</pre>.
           <pre>      
{
	  "pattern": "^objects/([^/]+)$",
	  "substitution": "/v1/_queries/public/get-object.jq?object-id=$1"
}
		   </pre></p><p>
           When writing rewrite objects take into account the following implementation details:
           <ul><li>There is no <pre>/</pre> at the beginning of the string being matched</li><li>The rewrite rules will not override any request to the project APIs, but can interfere with legacy query and handler execution</li><li>Variable references within the pattern and substitution strings is limited to the previous variable list</li></ul></p></div><h4>Full example</h4><p>
         The following example maps GET requests to <pre>http://myproject.28.io/objects/{an-object-id}</pre> as GET requests 
         to <pre>http://myproject.28.io/v1/_queries/public/get-object.jq?object-id={an-object-id}</pre>.
      </p><p><pre>
[
  {
    "conditions":
	[
	  {
	    "testVariable": "REQUEST_METHOD",
		"condPattern":  "=GET"
	  },
	  {
	    "testVariable": "ENV:28_REQUEST_URI",
		"condPattern":  "^/objects/",
		"flags": ["NC"]
	  }
	],
	"rewrite":
	{
	  "pattern": "^objects/([^/]+)$",
	  "substitution": "/v1/_queries/public/get-object.jq?object-id=$1"
	}
  }
]
         </pre></p></div>
 * @class Project
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Project = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Project(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'http://portal.28.io/api';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    /**
     * Retrieves the project metadata for all projects owned by an account
     * @method
     * @name Project#listProjects
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.listProjects = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project';

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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Creates a new project
     * @method
     * @name Project#createProject
     * @param {string} projectName - The project name.
     * @param {string} template - A template name. If not specified the 'default' template will be used.
     * @param {string} package - A package name. If not specified the 'free' package will be used.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.createProject = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['projectName'] !== undefined) {
            queryParameters['project-name'] = parameters['projectName'];
        }

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: projectName'));
            return deferred.promise;
        }

        if (parameters['template'] !== undefined) {
            queryParameters['template'] = parameters['template'];
        }

        if (parameters['package'] !== undefined) {
            queryParameters['package'] = parameters['package'];
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Checks if a project exists
     * @method
     * @name Project#checkProject
     * @param {string} projectName - The project name.
     * 
     */
    Project.prototype.checkProject = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Retrieves a project metadata
     * @method
     * @name Project#getProjectMetadata
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.getProjectMetadata = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Upgrades a project to the last Sausalito version
     * @method
     * @name Project#upgradeProject
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.upgradeProject = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Changes a project metadata
     * @method
     * @name Project#updateProject
     * @param {string} projectName - The project name.
     * @param {string} newName - The new project name.
     * @param {string} package - The project package.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.updateProject = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
            return deferred.promise;
        }

        if (parameters['newName'] !== undefined) {
            queryParameters['new-name'] = parameters['newName'];
        }

        if (parameters['package'] !== undefined) {
            queryParameters['package'] = parameters['package'];
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
            method: 'PATCH',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Deletes a project
     * @method
     * @name Project#deleteProject
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.deleteProject = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Retrieves the default MongoDB credentials
     * @method
     * @name Project#getDefaultMongoDBCredentials
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.getDefaultMongoDBCredentials = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/default-mongodb';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Updates a project default MongoDB credentials
     * @method
     * @name Project#updateDefaultMongoDBCredentials
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * @param {string} dbType - The database type.
     * @param {string} connString - The database connection string. Only for "user" databases.
     * @param {string} db - The database name. Only for "user" databases.
     * @param {string} user - The database user. Only for "user" databases.
     * @param {string} pass - The database password. Only for "user" databases.
     * @param {boolean} preDigested - Whether the specified password is pre-digested or not. Only for "user" databases. Default is false.
     * 
     */
    Project.prototype.updateDefaultMongoDBCredentials = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/default-mongodb';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['dbType'] !== undefined) {
            queryParameters['db-type'] = parameters['dbType'];
        }

        if (parameters['dbType'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: dbType'));
            return deferred.promise;
        }

        if (parameters['connString'] !== undefined) {
            queryParameters['conn-string'] = parameters['connString'];
        }

        if (parameters['db'] !== undefined) {
            queryParameters['db'] = parameters['db'];
        }

        if (parameters['user'] !== undefined) {
            queryParameters['user'] = parameters['user'];
        }

        if (parameters['pass'] !== undefined) {
            queryParameters['pass'] = parameters['pass'];
        }

        if (parameters['preDigested'] !== undefined) {
            queryParameters['pre-digested'] = parameters['preDigested'];
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Tests MongoDB credentials
     * @method
     * @name Project#testDefaultMongoDB
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * @param {string} connString - The database connection string.
     * @param {string} db - The database name.
     * @param {string} user - The database user.
     * @param {string} pass - The database password.
     * @param {boolean} preDigested - Whether the specified password is pre-digested or not. Default is false.
     * 
     */
    Project.prototype.testDefaultMongoDB = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/test-mongodb';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['connString'] !== undefined) {
            queryParameters['conn-string'] = parameters['connString'];
        }

        if (parameters['connString'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: connString'));
            return deferred.promise;
        }

        if (parameters['db'] !== undefined) {
            queryParameters['db'] = parameters['db'];
        }

        if (parameters['db'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: db'));
            return deferred.promise;
        }

        if (parameters['user'] !== undefined) {
            queryParameters['user'] = parameters['user'];
        }

        if (parameters['pass'] !== undefined) {
            queryParameters['pass'] = parameters['pass'];
        }

        if (parameters['preDigested'] !== undefined) {
            queryParameters['pre-digested'] = parameters['preDigested'];
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Lists all custom domains of a project
     * @method
     * @name Project#listCustomDomains
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.listCustomDomains = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/domains';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Adds a custom domain to a project
     * @method
     * @name Project#addCustomDomain
     * @param {string} projectName - The project name.
     * @param {string} domainName - The name of the new custom domain.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.addCustomDomain = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/domains';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
            return deferred.promise;
        }

        if (parameters['domainName'] !== undefined) {
            queryParameters['domain-name'] = parameters['domainName'];
        }

        if (parameters['domainName'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: domainName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Deletes a project custom domain
     * @method
     * @name Project#deleteCustomDomain
     * @param {string} projectName - The project name.
     * @param {string} domainName - The project name.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.deleteCustomDomain = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/domains/{domain-name}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
            return deferred.promise;
        }

        path = path.replace('{domain-name}', parameters['domainName']);

        if (parameters['domainName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: domainName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Lists the project custom rewrite rules
     * @method
     * @name Project#getCustomRewriteRules
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.getCustomRewriteRules = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/rewrites';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Sets the project custom rewrites rules
     * @method
     * @name Project#setCustomRewriteRules
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * @param {array} customRewrites - The new custom rewrites

     * 
     */
    Project.prototype.setCustomRewriteRules = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/rewrites';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
            return deferred.promise;
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['token'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: token'));
            return deferred.promise;
        }

        if (parameters['customRewrites'] !== undefined) {
            body = parameters['customRewrites'];
        }

        if (parameters['customRewrites'] === undefined) {
            deferred.reject(new Error('Missing required body parameter: customRewrites'));
            return deferred.promise;
        }

        headers['Content-Type'] = 'application/json; charset=utf-8';

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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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
     * Removes the project custom rewrite rules
     * @method
     * @name Project#removeCustomRewriteRules
     * @param {string} projectName - The project name.
     * @param {string} token - An API token.
     * 
     */
    Project.prototype.removeCustomRewriteRules = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/project/{project-name}/rewrites';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        path = path.replace('{project-name}', parameters['projectName']);

        if (parameters['projectName'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: projectName'));
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
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
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

    return Project;
})();

exports.Project = Project;