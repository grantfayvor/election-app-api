app.controller('DepartmentController', ['$rootScope', '$scope', '$state', 'DepartmentService', function ($rootScope, $scope, $state, DepartmentService) {

    $scope.department = {};
    $scope.object = {};
    $scope.departments = [];
    $scope.page = 'view-departments';
    $scope.roles = [];
    $scope.departmentChecks = [];
    $scope.pagination = {};
    $scope.pagination.index = 1;

    $scope.registerDepartment = function () {
        console.log("i got to register the department");
        DepartmentService.register($scope.department, function (response) {
            console.log("registration was successful");
            $state.go('view_departments');
        }, function (response) {
            console.log("an error occurred while trying to register the department");
        });
    };

    $scope.getAllDepartments = function () {
        DepartmentService.getAllDepartments(function (response) {
            $scope.departments = response.data;
        }, function (response) {
            console.log("error occured while trying to fetch the departments");
        });
    };

    $scope.getDepartmentDetails = function (id) {
        DepartmentService.getDepartmentById(id, function (response) {
            $scope.department = response.data;
        }, function (response) {
            console.log("error occurred while trying to fetch the department details");
        });
    };

    $scope.updateDepartmentDetails = function (id) {
        DepartmentService.updateDepartmentDetails(id, $scope.department, function (response) {
            console.log("update was successful");
            $scope.getAllDepartments();
            $scope.page = 'view-departments';
        }, function (response) {
            console.error("error occurred while trying to update the department");
        });
    };

    $scope.deleteDepartment = function (id) {
        DepartmentService.deleteDepartment(id, function (response) {
            console.log("department was successfully deleted");
            $scope.getAllDepartments();
        }, function (response) {
            console.error("error occurred while trying to delete the department");
        });
    };

}]);

app.service('DepartmentService', ['APIService', function (APIService) {

    this.register = function (departmentDetails, successHandler, errorHandler) {
        APIService.post('/api/department', departmentDetails, successHandler, errorHandler);
    };

    this.getAllDepartments = function (successHandler, errorHandler) {
        APIService.get('/api/department', successHandler, errorHandler);
    };

    this.getDepartmentById = function (id, successHandler, errorHandler) {
        APIService.get('/api/department/' + id, successHandler, errorHandler);
    };

    this.deleteDepartment = function (id, successHandler, errorHandler) {
        APIService.delete('/api/department/' + id, successHandler, errorHandler);
    };
}]);