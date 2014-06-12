youserApp
    .factory('eventFactory', function () {

        var events = [
            {
                id: 1,
                date: '09.04.1979',
                motto: 'My Birthday',
                location: 'Rheinfall',
                owner: {
                    firstname: 'Cedric',
                    lastname: 'Wider'
                },
                participants: [
                    {
                        firstname: 'Cedric',
                        lastname: 'Wider'
                    }
                ]

            },
            {
                id: 2,
                date: '10.04.1979',
                motto: 'Not My Birthday',
                location: 'everywhere',
                owner: {
                    firstname: 'Roger',
                    lastname: 'Fierz'
                },
                participants: [
                    {
                        firstname: 'Cedric',
                        lastname: 'Wider'
                    }, {
                        firstname: 'Roger',
                        lastname: 'Fierz'
                    }
                ]
            },
            {
                id: 3,
                date: '10.06.2014',
                motto: 'Doener essen',
                location: 'Doenerbude',
                owner: {
                    firstname: 'Elvira',
                    lastname: 'Abbruzzese'
                },
                participants: [
                    {
                        firstname: 'Cedric',
                        lastname: 'Wider'
                    }, {
                        firstname: 'Roger',
                        lastname: 'Fierz'
                    }, {
                        firstname: 'Adnan',
                        lastname: 'Rafiq'
                    }
                ]
            },
            {
                id: 4,
                date: '16.06.2014',
                motto: 'Gruempi',
                location: 'Daellikon',
                owner: {
                    firstname: 'Cedric',
                    lastname: 'Wider'
                },
                participants: [
                    {
                        firstname: 'Cedric',
                        lastname: 'Wider'
                    }
                ]
            }
        ];

        var factory = {};
        factory.findAll = function () {
            return events;
        };

        factory.findUpcoming = function () {
            return [
                {
                    date: '10.06.2014',
                    motto: 'Doener essen'
                },
                {
                    date: '16.06.2014',
                    motto: 'Gruempi'
                }
            ];
        };

        factory.findById = function(id) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].id === id) {
                    return events[i];
                }
            }
            return null;
        };

        factory.save = function(event) {
            if(!event.id) {
                events.add(event);
            } else {
                var old = factory.findById(event.id);
                var index = events.indexOf(old);
                events[index] = event;
            }
        }

        return factory;
    })

    .factory('userFactory', function () {
        var factory = {};

        var users = [
            {
                id: 1,
                firstname: 'Cedric',
                lastname: 'Wider'
            },
            {
                id: 2,
                firstname: 'Elvira',
                lastname: 'Abbruzzese'
            },
            {
                id: 3,
                firstname: 'Adnan',
                lastname: 'Rafiq'
            },
            {
                id: 4,
                firstname: 'Roger',
                lastname: 'Fierz'
            }
        ];
        factory.findAll = function () {
            return users;
        };

        factory.findById = function(id) {
            for(var i = 0; i < users.length; i++) {
                if (users[i].id === id) {
                    return users[i];
                }
            }
            return null;
        };

        return factory;
    })

    .factory('wichtlerFactory', function () {
        var factory = {};

        factory.findMyWichtlers = function () {
            return [
                {
                    firstname: 'Elvira',
                    lastname: 'Abbruzzese'
                },
                {
                    firstname: 'Jerome',
                    lastname: 'Wider'
                },
                {
                    firstname: 'Evelyne',
                    lastname: 'Wider'
                },
                {
                    firstname: 'Jeremy',
                    lastname: 'Wider'
                },
                {
                    fistname: 'Noah',
                    lastname: 'Wider'
                }
            ];
        };

        return factory;
    })

    .factory('wishlistFactory', function(){
        var factory = {};

        factory.findMyWishlistItems = function() {
            return [
                {
                    description: 'Lego House',
                    price: '20.55'
                }, {
                    description: 'Boss Botteled',
                    price: '50.25'
                }, {
                    description: 'Renault Megane RS',
                    price: '40518'
                }
            ];
        };

        return factory;
    });