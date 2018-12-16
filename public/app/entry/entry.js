var app = angular.module('election_app', ['ngSanitize', 'ui.router', 'ngCookies', 'ngFileUpload']);

app.config(['$httpProvider', '$interpolateProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($httpProvider, $interpolateProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

        $httpProvider.defaults.headers.common.Accept = "application/json";
        $httpProvider.defaults.headers.common['Content-Type'] = "application/json";
        // $httpProvider.defaults.useXDomain = true;
        $httpProvider.interceptors.push('httpInterceptor');

        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');
        // $urlRouterProvider.when('/', 'dashboard');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home.html',
                controller: 'MainController'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/modules/user/register.html',
                controller: 'UserController'
            })
            .state('all_reports', {
                url: '/all_reports',
                templateUrl: 'app/modules/report/all-reports.html',
                controller: 'ReportController'
            });
    }
]);