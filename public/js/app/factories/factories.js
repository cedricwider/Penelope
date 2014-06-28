youserApp
    .factory('eventFactory', function (Restangular) {

        var events = Restangular.all('event').getList().$object;

        var factory = {};

        factory.findAll = function () {
            return events;
        };

        factory.findUpcoming = function () {
            return Restangular.all('event').getList({query: 'date>=' + new Date().getTime()}).$object;
        };

        factory.findById = function(id) {
            for (var i = 0; i < events.length; i++) {
                if (events[i]._id === id) {
                    return events[i];
                }
            }
            return null;
        };

        factory.save = function(event) {
            if(!event._id) {
                var response = events.post(event);
                event._id = response._id;
                events.push(event);
            } else {
                event.put();
                var old = factory.findById(event._id);
                var index = events.indexOf(old);
                if (index) {
                    events[index] = event;
                }
            }
            return event._id;
        }

        factory.delete = function(event) {
            var index = events.indexOf(event);
            var rest_event = events[index];
            rest_event.remove();
            events.splice(index, 1);
        }

        return factory;
    })

    .factory('userFactory', function ($rootScope, Restangular) {
        var factory = {};
        var me = Restangular.one('user', 'me').get().$object;
        var users = Restangular.all('user').getList().$object;

        factory.findAll = function () {
            return users;
        };

        factory.findFriends = function(myId) {
            var friends = users;
            if (myId) {
                friends = _.find(users, function(user){
                    return user.friends && _.contains(user.friends, myId);
                });
            }
            return friends;
        }

        factory.findById = function(id) {
            for(var i = 0; i < users.length; i++) {
                if (users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        };

        factory.findMe = function() {
            return me;
        }

        return factory;
    })

    .factory('wichtlerFactory', function (Restangular) {
        var factory = {};
        var myWichtlers = null;
        factory.findMyWichtlers = function (me) {
            myWichtlers = myWichtlers || Restangular.all('wichtel').getList({query: 'servant=' + me._id}).$object;
            return myWichtlers;
        };

        return factory;
    })

    .factory('wishlistFactory', function(userFactory, Restangular){
        var factory = {};
        var myWishlist = null;

        factory.findMyWishlistItems = function(me) {
            myWishlist = myWishlist || Restangular.all('wishlist').getList({query: 'owner=' + me._id}).$object;
            return myWishlist;
        };

        factory.findWishlistItems = function(user_id) {
            return Restangular.all('wishlist').getList({query: 'owner=' + user_id}).$object;
        }

        factory.save = function(wish) {
            var response = myWishlist.post(wish);
            wish._id = response._id;
            myWishlist.push(wish);
        }

        factory.delete = function(wish) {
            var index = myWishlist.indexOf(wish);
            var rest_wish = myWishlist[index];
            rest_wish.remove();
            myWishlist.splice(index, 1);
        }

        return factory;
    });