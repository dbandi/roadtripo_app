app.service('dataService', function($http) {

      this.signup = function(userDetails) {
          return $http({
              method: 'POST',
              url: '/signup',
              data: userDetails,
              headers: {'Content-Type': 'application/json; charset=utf-8'}
          });
      };

      this.getTripRoute = function(tripId){
          return $http({
              method: 'GET',
              url: 'http://localhost:3000/gettriproute?trip_id='+tripId,
              headers: {'Content-Type': 'application/json; charset=utf-8'}
          });
      };

      this.login = function(userDetails) {
          return $http({
              method: 'POST',
              url: 'http://localhost:3000/login',
              data: userDetails,
              headers: {'Content-Type': 'application/json; charset=utf-8'}
          });
      };

      this.searchTrip = function(search){
          return $http({
              method: 'GET',
              url: 'http://localhost:3000/searchtrip?search='+search,
              headers: {'Content-Type': 'application/json; charset=utf-8'}
          });
      };
});
