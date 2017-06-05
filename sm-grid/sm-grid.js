  (function() {
    'use strict';

    angular.module('societyApp')
      .directive('smGrid', function() {
        return{
          restrict: 'E',
          templateUrl: 'sm-grid/sm-grid.tpl.html',
          scope: {
            gridData: '=',
            gridColumns: '=',
            onRowClicked: '&'
          },
          controller: 'smGridCtrl',
          controllerAs: 'grid',
          bindToController: true,
          link: function(scope, element, attributes){
            var filter = scope.$on('onFilter',function(event, data){
             if(scope.grid){
               scope.grid.filterBy(data);
             }
            });
            
            scope.$on('destroy', function(){
              filter();
            });
          }
        }
      }).
      controller('smGridCtrl', ['$scope', 'paginationService', 'orderByFilter', '$filter', function($scope, paginationService, orderBy, $filter){
        var grid = this;
        
        grid.onRowSelected = function(row){
          grid.selectedRow = row;
          if(grid.onRowClicked){
            grid.onRowClicked({row:row});
          }
        };
        
        // Grid Sorting
        grid.sortBy = function(sortColumn) {
          grid.reverse = (grid.sortColumn === sortColumn) ? !grid.reverse : false;
          grid.sortColumn = sortColumn;
          grid.filteredModel = orderBy(grid.filteredModel, grid.sortColumn, grid.reverse);
          grid.setPage(1);
        };
        
        //Grid Paging
        grid.setPage = function(pageNumber) {
          pageNumber = pageNumber || 1;

          if (grid.filteredModel) {

            grid.pager = paginationService.getPager(grid.filteredModel.length, pageNumber);

            if (pageNumber < 1 || pageNumber > grid.pager.totalPages) {
              return;
            }
            //get current page of items
            grid.rows = grid.filteredModel.slice(grid.pager.startIndex, grid.pager.endIndex + 1);
          }
        };
        
        // Grid Filter Result
        grid.filterBy = function(searchText){
          grid.filteredModel = $filter('filter')(grid.gridData, searchText);
          
          if(grid.sortColumn){
            grid.filteredModel = orderBy(grid.filteredModel, grid.sortColumn, grid.reverse);
          }
          
          grid.setPage(1);
          
        }
        
        // Initialize 
        var onInit = function(){
          if(grid.gridData && grid.gridData.length >0 ){
            grid.filteredModel = grid.gridData;
            grid.onRowSelected(grid.gridData[0]);
            grid.setPage(1);
          }
        };
        
        onInit();

      }]);
  })();