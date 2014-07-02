module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'lib/api.28.io.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        'swagger-js-codegen': {
            options: {
                apis: [
                    {
                        swagger: 'swagger/_queries.json',
                        fileName: 'queries.api.28.io.js',
                        className: 'Queries'
                    },
                    {
                        swagger: 'swagger/auth.json',
                        fileName: 'auth.api.28.io.js',
                        className: 'Auth'
                    },
                    {
                        swagger: 'swagger/_modules.json',
                        fileName: 'modules.api.28.io.js',
                        className: 'Modules'
                    },
                    {
                        swagger: 'swagger/_datasources.json',
                        fileName: 'datasources.api.28.io.js',
                        className: 'Datasources'
                    },
                    {
                        swagger: 'swagger/project.json',
                        fileName: 'project.api.28.io.js',
                        className: 'Project'
                    }
                ],
                dest: 'lib'
            },
            dist: {

            }
        },
        vows: {
            all: {
                options: {
                    verbose: true,
                    colors: true,
                    coverage: 'json'
                },
                // String or array of strings
                // determining which files to include.
                // This option is grunt's "full" file format.
                src: ['test/*', 'spec/*']
            }
        },
        jsonlint: {
            all: {
                src: ['package.json', 'swagger/*.json', '.jshintrc']
            }
        }
    });

    // Load local tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Default task.
    grunt.registerTask('default', ['jsonlint', 'jshint', 'swagger-js-codegen', 'vows']);
};
