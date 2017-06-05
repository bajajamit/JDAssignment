  (function() {
    'use strict';

    angular.module('societyApp')
      .service('societyDataService', ['$http', '$q', function($http, $q) {
        
        var _baseUri = 'http://private-a73e-aquentuxsociety.apiary-mock.com/members';

        this.getSocietyMembers = function() {
          var deferred = $q.defer();
          $http({
              method: 'GET',
              url: _baseUri
            })
            .success(function(response) {
              deferred.resolve(response);
            })
            .error(function(response) {
              deferred.reject(response);
            });

          return deferred.promise;
        };
      }]);

  })();