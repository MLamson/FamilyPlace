;(function (){

  angular.module('Posts')

    .factory('PostsFactory', ['$http', '$rootScope', 'PARSE',
      function ($http, $rootScope, PARSE) {

         // Getting A List of posts
      var getAllPosts = function () {
        return $http.get(PARSE.URL + 'classes/Posts', PARSE.CONFIG);
      };

         // Adding A Post
      var addSinglePost = function (obj) {
        $http.post(PARSE.URL + 'classes/Posts', obj, PARSE.CONFIG)
          .success( function () {
            $rootScope.$broadcast('post:added');
          }
      );
      };

      return {
        add : addSinglePost,
        retrieve : getAllPosts,
      }
    }


      ]);
}());