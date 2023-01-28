angular.module('userControllers', [])
.controller('regCtrl', function($http) {
    this.regUser = function(regData) { 
        console.log("data submmited ");
        $http.post('/api',this.regData).then(function(data){
            console.log(data);
        });

     };
});