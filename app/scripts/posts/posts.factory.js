;(function (){

  angular.module('Posts')

    .factory('PostsFactory', ['$http', '$rootScope', 'PARSE', 'UserFactory',
      function ($http, $rootScope, PARSE, UserFactory) {

         var user = UserFactory.user();

         // Getting A List of posts
      var getAllPosts = function () {
        return $http.get(PARSE.URL + 'classes/Posts', PARSE.CONFIG);
        console.log('in getAllPosts post.factory.js');
      };

         // Adding A Post
      var addSinglePost = function (postObj) {

        /////////////////////////
        ///////////////////////
        ///////////////////////
         postObj.user = {
          __type: 'Pointer',
          className: '_User',
          objectId: user.objectId
        }

        // Set up Access Control
        var ACLObj = {};
        ACLObj[user.objectId] = {
          'read' : true,
          'write' : true
        }

        postObj.ACL = ACLObj;

        //return $http.post(PARSE.URL + 'classes/Lists', listObj, PARSE.CONFIG);
        ///////////////
        ///////////////
        ///////////////

        $http.post(PARSE.URL + 'classes/Posts', postObj, PARSE.CONFIG)
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

      // var updatePosts = function (obj) {
      //    return $http.put(PARSE.URL + 'classes/Posts' + obj.objectId, PARSE.CONFIG);
      // };

      return {
        add : addSinglePost,
        retrieve : getAllPosts,
        remove : removePost,
        edit : editPosts,
        // update : updatePosts
      }
    }


      ]);
}());