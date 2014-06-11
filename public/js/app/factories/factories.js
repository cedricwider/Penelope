
youserApp.factory('eventFactory', function() {

    var factory = {};
    factory.findAll = function() {
        return [
            {
                date: '09.04.1979',
                motto: 'My Birthday'
            }, {
                date: '10.04.1979',
                motto: 'Not My Birthday'
            }, {
                date: '10.06.2014',
                motto: 'Doener essen'
            }, {
                date: '16.06.2014',
                motto: 'Gruempi'
            }
        ];
    };

    factory.findUpcoming = function() {
        return [
            {
                date: '10.06.2014',
                motto: 'Doener essen'
            }, {
                date: '16.06.2014',
                motto: 'Gruempi'
            }
        ];
    };

    return factory;
});

youserApp.factory('userFactory', function () {
    var factory = {};

    factory.findAll = function() {
        return [
            {
                firstname: 'Cedric',
                lastname: 'Wider'
            }, {
                firstname: 'Elvira',
                lastname: 'Abbruzzese'
            }, {
                firstname: 'Adnan',
                lastname: 'Rafiq'
            }, {
                firstname: 'Roger',
                lastname: 'Fierz'
            }
        ];
    };

    return factory;
});