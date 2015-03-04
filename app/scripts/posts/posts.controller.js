;(function (){

  angular.module('Posts')

    .controller('PostsController', ['$scope', 'PostsFactory', '$rootScope', '$location',

      function ($scope, PostsFactory, $rootScope, $location) {

         PostsFactory.retrieve().success( function (data) {
          $scope.allPosts = data.results;
          console.log('in retrieve');
          // console.log(data.results);
        }),

         // $scope.updatePosts = function (p) {
         //  PostsFactory.update(p);
         //  console.log('inupdate');
         // },

         $scope.editPosts = function (p) {
          PostsFactory.edit(p).success(function(){

            
          });
          console.log(p);
         },

        $scope.addPosts = function (p) {
          PostsFactory.add(p);

        }, 

        $scope.removePost = function (data) {
          PostsFactory.remove(data);

          console.log('in remove post $scope');
          console.log(data.objectId);
        },

        $rootScope.$on('post:removed', function () {
          $location.path('/');
          PostsFactory.retrieve().success(function (data) {
            $scope.allPosts = data.results;
          });
        }),
        //$location.path('/');
        $rootScope.$on('post:added', function () {
          $location.path('/');
        });
      }
    ]);

}());