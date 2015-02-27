;(function (){

  angular.module('Posts')

    .controller('PostsController', ['$scope', 'PostsFactory', '$rootScope', '$location',

      function ($scope, PostsFactory, $rootScope, $location) {

         PostsFactory.retrieve().success( function (data) {
          $scope.allPosts = data.results;
          console.log('in retrieve');
          console.log(data.results);
        }),

        $scope.addPosts = function (p) {
          PostsFactory.add(p);

        }
        //$location.path('/');
        $rootScope.$on('post:added', function () {
          $location.path('/');
        });

      }










      ]);

}());