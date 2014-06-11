
youserApp.controller('EventCtrl', function($scope, eventFactory) {
    $scope.events = eventFactory.findAll();
    $scope.upcomingEvents = eventFactory.findUpcoming();
});

youserApp.controller('UserCtrl', function ($scope, userFactory) {
    $scope.users = userFactory.findAll();
});