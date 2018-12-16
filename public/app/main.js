app.controller('MainController', ['$rootScope', '$scope', '$cookies', '$state', 'MainService', function ($rootScope, $scope, $cookies, $state, MainService) {
    
}]);

app.service('MainService', ['APIService', 'reportUrl', function (APIService, reportUrl) {
    this.getVideoFeed = function(successHandler, errorHandler) {
        // APIService.get('/api/report')
    };
}]);