'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('swagger', 'Generate Source from Swagger files', function(){
        var fs = require('fs');
        var request = require('request');
       
        var done = this.async();
        var options = this.options();
        var dest = options.dest;
     
        var count = options.apis.length;
        options.apis.forEach(function(api, index){
            var swagger = fs.readFileSync(api.swagger);
            request({
                uri: 'http://secxbrl-beta.xbrl.io/angular.jq',
                qs: { module: api.module, service: api.service, 'new-module': api.newModule },
                headers: { 'Content-Type': 'text/json; utf-8' },
                body: swagger
            }, function(error, response, body){
                fs.writeFileSync(dest + api.service + '.js', body);
                grunt.log.writeln(api.service);
                count--;
                if(count === 0) {
                    done();
                }
            });
        });
    });
};
