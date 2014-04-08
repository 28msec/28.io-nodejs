'use strict';

module.exports = function(grunt) {
    
    var params = function(){
        
    };

    var addMethod = function(source, op){
        return 'this.' + op.nickname + ' = function(' + params() + '){\n' +
        
        '};';
    };

    var clazz = function(source, className){
        return 'module.exports.' + className + ' = function(domain){\n"use strict";\nvar request = require("request");' + source + '\n};';
    };
    
    var toJS = function(className, swagger){
        var source = '';
        var apis = swagger.apis;
        apis.forEach(function(api){
            var operations = api.operations;
            operations.forEach(function(operation){
                addMethod(source, operation);
            });
        });
        clazz(source, className);
        return source;
    };

    grunt.registerMultiTask('swagger', 'Generate Source from Swagger files', function(){
        var fs = require('fs');
       
        var options = this.options();
        var dest = options.dest;

        options.apis.forEach(function(api){
            var swagger = fs.readFileSync(api.swagger);
            var js = toJS(options.className, swagger);
            console.log(js);
            fs.writeFileSync(dest + api.module + '.js', js);
            grunt.log.writeln(dest + api.module + '.js written');
        });
    });
};
