app.controller('UserController', ['$rootScope', '$scope', '$state', 'UserService', function ($rootScope, $scope, $state, UserService) {

    $scope.user = {};
    $scope.object = {};
    $scope.users = [];
    $scope.page = 'view-users';
    $scope.roles = [];
    $scope.userChecks = [];
    $scope.pagination = {};
    $scope.pagination.index = 1;

    $scope.registerUser = function() {
        console.log("i got to register the user");
        UserService.register($scope.user, function(response) {
            console.log("registration was successful");
        }, function (response) {
            console.log("an error occurred while trying to register the user");
        });
    };

    $scope.getAllUsers = function () {
        UserService.getAllUsers(function (response) {
            $scope.users = response.data;
        }, function (response) {
            console.log("error occured while trying to fetch the users");
        });
    };

    $scope.getUserDetails = function (id) {
        UserService.getUserById(id, function (response) {
            $scope.object.user = response.data;
            $scope.object.role = $scope.object.previousRole = response.data.roles[0].name;
            // $scope.page = 'user-details';
            $('#usersModal').modal('show');
            console.log($scope.object);
        }, function (response) {
            console.log("error occurred while trying to fetch the user details");
        });
    };

    $scope.updateUserDetails = function (id) {
        UserService.updateUserDetails(id, $scope.user, function (response) {
            console.log("update was successful");
            $scope.getAllUsers();
            $scope.page = 'view-users';
        }, function (response) {
            console.error("error occurred while trying to update the user");
        });
    };

    $scope.deleteUser = function (id) {
        UserService.deleteUser(id, function (response) {
            console.log("user was successfully deleted");
            $scope.getAllUsers();
        }, function (response) {
            console.error("error occurred while trying to delete the user");
        });
    };

}]);

app.service('UserService', ['APIService', function (APIService) {

    this.register = function (userDetails, successHandler, errorHandler) {
        APIService.post('/api/user', userDetails, successHandler, errorHandler);
    };

    this.getAllUsers = function (successHandler, errorHandler) {
        APIService.get('/api/user', successHandler, errorHandler);
    };

    this.getUserById = function (id, successHandler, errorHandler) {
        APIService.get('/api/user/' + id, successHandler, errorHandler);
    };

    this.deleteUser = function (id, successHandler, errorHandler) {
        APIService.delete('/api/user/' + id, successHandler, errorHandler);
    };
}]);