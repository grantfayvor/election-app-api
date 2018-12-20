app.controller('ReportController', ['$rootScope', '$scope', '$state', 'ReportService', function ($rootScope, $scope, $state, ReportService) {

    $scope.reports = [];

    $scope.getAllReports = function () {
        ReportService.getAllReports(function (response) {
            $scope.reports = response.data;
        }, function (response) {
            console.log("an error occurred while fetching the reports");
        });
    };

    $scope.fetchReportDetails = function (id) {
        ReportService.fetchReportDetails(id, function (response) {
            $scope.reportData = response.data;
        }, function (response) {
            console.log("an error occurred while fetching the reports");
        });
    };

    $scope.sendResponse = function () {
        var request = {
            report: $scope.reportData._id,
            reporter: $scope.reportData.reporter,
            response: $scope.response
        };
        ReportService.sendResponse(request, function (response) {
            if (response.data) {
                $("#modal-default").modal('hide');
                toastr.success('Response created!');
            }
        }, function (response) {
            console.log("an error occurred while fetching the reports");
        });
    };
}]);

app.service('ReportService', ['APIService', function (APIService) {
    this.getAllReports = function (successHandler, errorHandler) {
        APIService.get('/api/report/populateAll', successHandler, errorHandler);
    };

    this.fetchReportDetails = function (id, successHandler, errorHandler) {
        APIService.get('/api/report/fetchReport/' + id, successHandler, errorHandler);
    };

    this.sendResponse = function (data, successHandler, errorHandler) {
        APIService.post('/api/response', data, successHandler, errorHandler);
    };
}]);