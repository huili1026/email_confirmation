angular.module('userControllers', [])
.controller('regCtrl', function($http, $location, $timeout) {
    var app = this;
    this.regUser = function(regData) { 
        app.errorMsg = false;
        app.loading = true;
        console.log("data submmited!");
        $http.post('/api',this.regData).then(function(data){

            if (data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + '...Redirecting';

                $timeout(function(){
                    $location.path("/");
                }, 2000);
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
     };
});