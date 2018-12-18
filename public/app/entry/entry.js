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
            })
            .state('live_reports', {
                url: '/live_reports',
                templateUrl: 'app/modules/report/live.html',
                controller: 'ReportController'
            })
            .state('view_users', {
                url: '/view_users',
                templateUrl: 'app/modules/user/view-users.html',
                controller: 'UserController'
            })
            .state('create_category', {
                url: '/create_category',
                templateUrl: 'app/modules/user/create-category.html',
                controller: 'UserController'
            })
            .state('new_department', {
                url: '/new_department',
                templateUrl: 'app/modules/department/new-department.html',
                controller: 'DepartmentController'
            })
            .state('view_departments', {
                url: '/view_departments',
                templateUrl: 'app/modules/department/view-departments.html',
                controller: 'DepartmentController'
            });
    }
]);