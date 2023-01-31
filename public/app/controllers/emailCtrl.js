angular.module('emailController', ['userServices'])
.controller('emailCtrl', function($routeParams, User) {
    var app = this;
    User.activeAccount($routeParams.token).then(function(data){
        app.successMsg = false;
        app.errorMsg = false;

        if(data.data.success) {
            app.successMsg = data.data.message;
        } else {
            app.errorMsg = data.data.message;
        }
    })
    
});