app.controller('ReportController', ['$rootScope', '$scope', '$state', 'ReportService', function ($rootScope, $scope, $state, ReportService) {

    $scope.reports = [];

    $scope.getAllReports = function () {
        ReportService.getAllReports(function (response) {
            $scope.reports = response.data;
        }, function (response) {
            console.log("an error occurred while fetching the reports");
        });
    };

}]);

app.service('ReportService', ['APIService', function (APIService) {
    this.getAllReports = function (successHandler, errorHandler) {
        APIService.get('/api/report/populateAll', successHandler, errorHandler);
    };
}]);