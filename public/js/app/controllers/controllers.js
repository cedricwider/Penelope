
youserApp
    .controller('OverviewCtrl', function($scope, eventFactory, userFactory, wichtlerFactory, wishlistFactory){
        $scope.events = eventFactory.findAll();
        $scope.upcomingEvents = eventFactory.findUpcoming();
        $scope.users = userFactory.findAll();
        $scope.wichtlers = wichtlerFactory.findMyWichtlers($scope.me);
        $scope.wishlist = wishlistFactory.findMyWishlistItems($scope.me);
    })

    .controller('EventCtrl', function($scope, $location, eventFactory, userFactory) {
        $scope.events = eventFactory.findAll();
        $scope.showDetails = function(event_id) {
            $location.path('/events/' + event_id);
        }
        $scope.findOwner = function(event) {
            return userFactory.findById(event.owner);
        }

        $scope.createEvent = function() {
            var event = {};
            event.owner = $scope.me._id;
            var event_id = eventFactory.save(event);
            $location.path('/events/' + event_id);
        }

        $scope.delete = function(event) {
            eventFactory.delete(event);
        }
    })

    .controller('FriendCtrl', function($scope, $location, userFactory) {
        $scope.friends = userFactory.findFriends();
        $scope.showDetails = function(userId) {
            $location.path('/users/' + userId);
        }
    })

    .controller('WishlistCtrl', function($scope, $location, wishlistFactory) {
        $scope.wishlist = wishlistFactory.findMyWishlistItems($scope.me);
        $scope.new_wish = {};
        $scope.save = function(wish) {
            wish.owner = $scope.me._id;
            wishlistFactory.save(wish);
            $scope.new_wish = {};
        }
        $scope.delete = function(wish) {
            wishlistFactory.delete(wish);
        }
    })

    .controller('EventDetailCtrl', function($scope, $location, $routeParams, eventFactory, userFactory) {
        $scope.event = eventFactory.findById($routeParams.eventId);
        $scope.edit = $scope.event.owner === $scope.me._id;

        $scope.save = function(event) {
            eventFactory.save(event);
            $location.path('/events');
        }

        $scope.canJoin = function() {
            if (!$scope.event.participants) return true;

            return $scope.event.participants.length == 0 || $scope.event.participants.indexOf($scope.me._id) == -1;
        }

        $scope.join = function() {
            if (!$scope.event.participants) $scope.event.participants = [];
            $scope.event.participants.push($scope.me._id);
            eventFactory.save($scope.event);
        };

        $scope.unjoin = function() {
            var index = $scope.event.participants.indexOf($scope.me._id);
            $scope.event.participants.splice(index, 1);
            eventFactory.save($scope.event);
        };

        $scope.participantForId = function(participant_id) {
            var participant = userFactory.findById(participant_id);
            return participant.firstname + ' ' + participant.lastname;
        }

    });