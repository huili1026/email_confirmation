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
    .when('/login',{
        templateUrl:'/app/views/pages/users/login.html'
    })
    .when('/logout',{
        templateUrl:'/app/views/pages/users/logout.html'
    })
    .when('/activate/:token', {
        templateUrl:'/app/views/pages/users/activation/activate.html',
        controller:'emailCtrl',
        controllerAs:'email'
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode({ enabled: true, requireBase: false });
});
