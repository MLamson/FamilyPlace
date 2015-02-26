;(function (){
  
  angular.module('Posts')

   .factory('PostsFactory', ['$http', 'PARSE', '$location', '$rootScope',
    function ($http, PARSE, $location, $rootScope) {

      // Getting A List of Posts
      var getAllPosts = function () {
        return $http.get(PARSE.URL + 'classes/Posts', PARSE.CONFIG);
      };

      // Adding A Whiskey
      var addSinglePost = function (obj) {
        $http.post(PARSE.URL + 'classes/Posts', obj, PARSE.CONFIG)
          .success( function () {
  //           $rootScope.$broadcast('whiskey:added');
          }
        );
      };

      return {
        retrieve : getAllPosts,
        add : addSinglePost
      };

    }
  ]);

}());