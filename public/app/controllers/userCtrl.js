angular.module('userControllers', ['userServices'])
.controller('regCtrl', function($location, $timeout, User) {
    var app = this;

    this.regUser = function() { 
        app.errorMsg = false;
        app.loading = true;

        User.create(app.regData).then(function(data){

            if (data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + '....Redirecting';

                $timeout(function(){
                    $location.path("/about");
                }, 2000);
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
     };
});