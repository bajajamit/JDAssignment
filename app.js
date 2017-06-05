  (function() {
    'use strict';

    angular.module('societyApp',[])
      .controller('societyCtrl', ['$scope', 'societyDataService', '$rootScope', function($scope, societyDataService, $rootScope) {
        
        var ctrl = this;

        societyDataService.getSocietyMembers().then(function(response) {
          
          ctrl.model = response;
          
          ctrl.model.forEach(addDisplayName);
          
          ctrl.ready = true;
          
        }, function(error) {
          console.log(error);
        });
    
        var addDisplayName = function(member){
          Object.defineProperty(member, 'name', {value: member.firstName + " " + member.surname}); 
        }
    
        ctrl.onRowClicked = function(row){
          ctrl.selectedRow = row;
        }
      
        var watcher = $scope.$watch('searchText', function(val) {
          val = val || '';
          $rootScope.$broadcast('onFilter', val);
        });
        
        $scope.$on('destroy',function(){
          watcher();
        });


      }]);

  })();