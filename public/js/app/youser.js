var youserApp = angular.module('youserApp', ['ngRoute']);

youserApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: '/partials/overview',
            controller: 'OverviewCtrl'
        })
        .when('/events', {
            templateUrl: '/partials/events',
            controller: 'EventCtrl'
        })
        .when('/events/:eventId', {
            templateUrl: '/partials/event_detail',
            controller: 'EventDetailCtrl'
        })
        .when('/friends', {
            templateUrl: '/partials/friends',
            controller: 'FriendCtrl'
        })
        .when('/wishlist', {
            templateUrl: '/partials/wishlist',
            controller: 'WishlistCtrl'
        })
        .when('/wichtel', {
            templateUrl: '/partials/wichtel',
            controller: 'WichtelCtrl'
        })
        .otherwise(
            {redirectTo: '/'}
        );
}]);