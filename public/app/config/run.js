/**
 * Created by Harrison on 3/19/2018.
 */

app.run(['$http', '$rootScope', '$cookies', '$state', '$timeout', function ($http, $rootScope, $cookies, $state, $timeout) {

    var token = getCookie("authorization");

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    if (token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        // $http.get('/oauth/check_token?token=' + token)
        //     .then(function (response) {
        //         $rootScope.isAuthorized = !!response.data;
        //         if ($rootScope.isAuthorized) $timeout(function () {
        //             window.location.href = "/";
        //         });
        //         else $timeout(function () {
        //             delete $http.defaults.headers.common.Authorization;
        //             window.localStorage.removeItem('authorization');
        //             window.location.href = "/login";
        //         });
        //     }, function (response) {
        //         $rootScope.isAuthorized = false;
        //         $timeout(function () {
        //             delete $http.defaults.headers.common.Authorization;
        //             window.localStorage.removeItem('authorization');
                    
        //         });
        //     });
    } else {
        $timeout(function () {
            window.location.href = "/login";
        });
    }

    // $rootScope.$on('$stateChangeStart', function (event, toState) {
    //     if (!angular.isFunction(toState.data.rule)) {
    //         event.preventDefault();
    //         return;
    //     }

    //     if (!$rootScope.isAuthorized) {
    //         event.preventDefault();
    //         $timeout(function () { $state.go('login'); });
    //     }

    //     event.preventDefault();
    //     $timeout(function () { $state.go(toState); });
    // });
}]);