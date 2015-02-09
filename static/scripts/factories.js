var app = angular.module('ALL.factories', []);



app.factory('LogoutFactory', function ($resource) {
   'use strict';
    return $resource('/logout/', {}, {
        logout: { method: 'GET' , params: {} }
    });
});