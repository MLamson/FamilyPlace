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


      var removePost = function (obj) {
        // console.log('inside remvoepost');
        // console.log(obj);
        $http.delete(PARSE.URL + 'classes/Posts/' + obj.objectId, PARSE.CONFIG)
          .success( function () {
            $rootScope.$broadcast('post:removed');

          }
      );
      } ;

      var editPosts = function (obj) {
         return $http.get(PARSE.URL + 'classes/Posts' + obj.objectId, PARSE.CONFIG);
      };

      var updatePosts = function (obj) {
         return $http.put(PARSE.URL + 'classes/Posts' + obj.objectId, PARSE.CONFIG);
      };

      return {
        add : addSinglePost,
        retrieve : getAllPosts,
        remove : removePost,
        edit : editPosts,
        update : updatePosts
      }
    }


      ]);
}());