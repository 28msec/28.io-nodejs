module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'tasks/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        'swagger-js-codegen': {
            options: {
                apis: [
                    {
                        swagger: 'swagger/_queries',
                        fileName: 'queries.api.28.io.js',
                        className: 'Queries'
                    },
                    {
                        swagger: 'swagger/auth',
                        fileName: 'auth.api.28.io.js',
                        className: 'Auth'
                    },
                    {
                        swagger: 'swagger/_modules',
                        fileName: 'modules.api.28.io.js',
                        className: 'Modules'
                    },
                    {
                        swagger: 'swagger/project',
                        fileName: 'project.api.28.io.js',
                        className: 'Project'
                    }
                ],
                dest: 'src'
            },
            dist: {

            }
        }
    });

    // Load local tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Default task.
    grunt.registerTask('default', ['jshint', 'swagger-js-codegen']);
};
