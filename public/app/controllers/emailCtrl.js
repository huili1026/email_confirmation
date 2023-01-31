angular.module('emailControllers', [])
.controller('emaCtrl', function($routeParams) {
    console.log('the token is ' + $routeParams.token);
});