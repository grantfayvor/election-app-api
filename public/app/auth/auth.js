/**
 * Created by Harrison on 3/17/2018.
 */
var app = angular.module('election_app', []);

app.controller('AuthController', ['$window', '$rootScope', '$scope', 'AuthService',
    function ($window, $rootScope, $scope, AuthService) {

        $scope.user = {};

        $scope.login = function () {
            AuthService.login({
                email: $scope.user.email,
                password: $scope.user.password
            }, function (response) {
                // $window.localStorage.setItem('authorization', response.data.token);
                document.cookie = "authorization=" + response.data.token + ";path=/;"
                AuthService.setHttpAuthorizationHeader(response.data.token);
                window.location.href = "/";
            }, function (response) {
                console.log("an error occurred while trying to login to the system");
                console.log(response);
            });
        };
    }
]);

app.service('AuthService', ['$http',
    function ($http) {

        this.login = function (userDetails, successHandler, errorHandler) {
            $http.post('/login', userDetails)
                .then(successHandler, errorHandler);
        };

        this.setHttpAuthorizationHeader = function (data) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + data;
        };

    }
]);