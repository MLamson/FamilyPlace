;(function (){
  
  angular.module('Posts')

  .controller('PostsController', ['$scope',
    
    // function ($scope) {

      // var r = $location.path();

      // if (r === '/') {
        WhiskeyFactory.retrieve().success( function (data) {
          $scope.allWhiskey = data.results;
        }),
      // }

      $scope.addPosts = function (w) {
        postsFactory.add(w);
      },

      // $rootScope.$on('whiskey:added', function (event) {
      //   // handle event only if it was not defaultPrevented
      //   if(event.defaultPrevented) {
      //     return;
      //   }
      //   // mark event as "not handle in children scopes"
      //   event.preventDefault();
      //   console.log('yo yo');
      //   $location.path('/');
      // });

    // }

  ]);

}());