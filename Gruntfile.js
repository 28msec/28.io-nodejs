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
        swagger: {
            options: {
                apis: [
                    {
                        swagger: 'swagger/_queries',
                        fileName: 'queries.api.28.io',
                        className: 'Queries'
                    },
                    {
                        swagger: 'swagger/auth',
                        fileName: 'auth.api.28.io',
                        className: 'Auth'
                    },
                    {
                        swagger: 'swagger/_modules',
                        fileName: 'modules.api.28.io',
                        className: 'Modules'
                    },
                    {
                        swagger: 'swagger/project',
                        fileName: 'project.api.28.io',
                        className: 'Project'
                    }
                ],
                dest: 'app/lib'
            },
            dist: {

            }
        }
    });

    // Load local tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    // Default task.
    grunt.registerTask('default', ['jshint', 'swagger']);
};
