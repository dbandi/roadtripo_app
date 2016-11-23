angular.module('starter.controllers', ['ngMap'])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, dataService, NgMap) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $rootScope.searchFeild = "";
  $scope.allTrips = [];

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $scope.userEmail = $scope.loginData.password;
    $scope.userPassword = $scope.loginData.username;

    var userDetails = {
        username : $scope.loginData.password,
        password : $scope.loginData.username
    }

    dataService.logsearchTripin(userDetails).then(function (response) {
        console.log(response);
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TripsCtrl', function($scope, $rootScope, dataService) {

    $scope.listTrips = [];

    dataService.searchTrip($rootScope.searchFeild).then(function (response) {
        $scope.allTrips = response.data;
        console.log(response.data);
        for (var i = 0; i < $scope.allTrips.length; i++) {
            var eachTrip = {
                trip_name : $scope.allTrips[i].trip_name,
                trip_image : JSON.parse($scope.allTrips[i].trip_details)[0].photo,
                trip_id : $scope.allTrips[i].trip_id,
                trip_details_length : JSON.parse($scope.allTrips[i].trip_details).length
            }
            $scope.listTrips.push(eachTrip);
        }
    });
})

.controller('RouteCtrl', function($rootScope, $state, $scope, $stateParams, dataService) {
    var tripId = $stateParams.tripId;

    dataService.getTripRoute(tripId).then(function (response) {
        $scope.tripRoute = JSON.parse(response.data[0].trip_details);
    });
})

.controller('searchController', function($rootScope, $state, $scope, $stateParams, dataService) {

    $scope.searchTrip = function(searchFeild){
        $rootScope.searchFeild  = searchFeild;
        $state.go('app.trips');
    }
})

.controller('MapController', function($stateParams, $scope, $ionicLoading) {
    console.log($stateParams.destination);
    $scope.destination = $stateParams.destination;
})

.controller('mytripsController', function($scope, $http, $stateParams, dataService) {

    var tripId = 1;

    dataService.getTripRoute(tripId).then(function (response) {
        console.log(response.data);
        $scope.tripRoute = JSON.parse(response.data[0].trip_details);
    });

});
