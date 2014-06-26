#28.io Nodejs Binding

[![Build Status](http://img.shields.io/travis/28msec/28.io-nodejs/master.svg?style=flat)](https://travis-ci.org/28msec/28.io-nodejs) [![NPM version](http://img.shields.io/npm/v/28.io-nodejs.svg?style=flat)](http://badge.fury.io/js/28.io-nodejs) [![Code Climate](http://img.shields.io/codeclimate/github/28msec/28.io-nodejs.svg?style=flat)](https://codeclimate.com/github/28msec/28.io-nodejs)

28.io-angularjs is an officially supported nodejs binding
for [28.io](http://28.io).
28.io is a query processing platform that allows you to write complex queries accross multiple data sources - relational databases; document stores, data warehouses and even web services.

We also have [tutorials](http://www.28.io/blog/tags/tutorial) and an
[REST API reference](http://www.28.io/documentation/latest/api).

Join our [28.io Support Group](https://28msec.zendesk.com) to ask questions and provide feedback.

##Installation
```bash
npm install 28.io-nodejs
```

##Example
```javascript
var $28 = require('api.28.io').$28('http://portal.28.io/api');
var projectName = 'apitests';
$28.Auth.authenticate({
    email: 'w+test@28.io',
    password: 'foobar',
    grant_type: 'client_credentials'
})
.then(function(response){
    var tokens = response.body;
    var projectToken = project_tokens['project_' + projectName];
    $28.Queries(projectname).listQueries({
        visibility: 'private',
        token: projectToken
})
.then(function(response){
    console.log(response.body);
});
```
