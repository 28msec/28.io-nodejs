'use strict';

var vows = require('vows');
var assert = require('assert');
//var fs = require('fs');
//var ffs = require('final-fs');
var events = require('events');

var $28 = require('../lib/api.28.io').$28;
var api = new $28('http://portal.28.io/api');

vows.describe('Test Queries API').addBatch({
    'Test Generated code for the 28.io Auth API': {
        topic: function(){
            return api.Auth;
        },
        'Calling Authenticate method with correct password': {
            topic: function(auth){
                var promise = new(events.EventEmitter)();
                auth.authenticate({
                    email: 'w+test@28.io',
                    password: 'foobar',
                    grant_type: 'client_credentials'
                }).then(function(result){
                    promise.emit('success', result);
                }, function(result){
                    promise.emit('error', result);
                });
                return promise;
            },
            'Should have valid password': {
                topic: function(success){
                    return success.body;
                },
                'listQueries': {
                    topic: function(tokens){
                        var Queries = api.Queries('http://apitests.28.io/v1');
                        var token = tokens.project_tokens.project_apitests;
                        var promise = new(events.EventEmitter)();
                        Queries.listQueries({
                            visibility: 'public',
                            token: token
                        }).then(function(result){
                            promise.emit('success', result);
                        }, function(result){
                            promise.emit('error', result);
                        });
                        return promise;
                    },
                    'Has a query list': function(result){
                        assert.equal(result.body.public instanceof Array, true);
                    }
                }
            }
        }
    }
}).export(module);
