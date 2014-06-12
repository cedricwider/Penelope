
youserApp
    .controller('OverviewCtrl', function($scope, eventFactory, userFactory, wichtlerFactory, wishlistFactory){
        $scope.events = eventFactory.findAll();
        $scope.upcomingEvents = eventFactory.findUpcoming();
        $scope.users = userFactory.findAll();
        $scope.wichtlers = wichtlerFactory.findMyWichtlers();
        $scope.wishlist = wishlistFactory.findMyWishlistItems();
    })

    .controller('EventCtrl', function($scope, $location, eventFactory) {
        $scope.events = eventFactory.findAll();
        $scope.showDetails = function(eventId) {
            $location.path( '/events/'+eventId );
        }
    })

    .controller('EventDetailCtrl', function($scope, $location, $routeParams, eventFactory) {
        $scope.event = eventFactory.findById(parseInt($routeParams.eventId, 10));
        $scope.save = function(event) {
            eventFactory.save(event);
            $location.path('/events');
        }
    });