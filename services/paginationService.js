  (function() {
    'use strict';

    angular.module('societyApp')
      .service('paginationService', function() {
        this.getPager = function(totalMembers, currentPage, pageSize) {
          currentPage = currentPage || 1;
          pageSize = pageSize || 15;

          // calculate total pages
          var totalPages = Math.ceil(totalMembers / pageSize) || 1;

          // calculate start and end item indexes
          var startIndex = (currentPage - 1) * pageSize;
          var endIndex = Math.min(startIndex + pageSize - 1, totalMembers - 1);


          return {
            totalMembers: totalMembers,
            currentPage: currentPage,
            totalPages: totalPages,
            pageSize: pageSize,
            startIndex: startIndex,
            endIndex: endIndex
          }
        }
      });
  })();