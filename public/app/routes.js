angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
    $routeProvider 
    .when('/about', {
        templateUrl:'app/views/pages/about.html'
    })
    .when('/register', {
        templateUrl:'app/views/pages/users/register.html',
        controller:'regCtrl',
        controllerAs:'register'
    })
    .when('/activate/:token', {
        templateUrl:'/app/views/pages/activate.html',
        controller:'emailCtrl',
        controllerAs:'email'
    })
    .otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
});
