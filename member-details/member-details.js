  (function() {
    'use strict';

    angular.module('societyApp')
      .directive('memberDetails', function() {
        return{
          restrict: 'E',
          templateUrl: 'member-details/member-details.tpl.html',
          scope: {
            member: '='
          }
          
        }
      });
  })();