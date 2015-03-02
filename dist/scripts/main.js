;(function (){
	
angular.module('Posts', ['ngRoute'])

.constant('PARSE', {

		URL: 'https://api.parse.com/1/',
		CONFIG: {
			headers: {
				'X-Parse-Application-Id' : 'Go6u44VU0XoKn8HsnjgxyIx7S7HnLvfgDAvB3nlk',
				'X-Parse-REST-API-Key' : 'gtTs5LqkQYg91G0UKGEN1WWGHjf3VLaGdPkxa6xD',
				'Content-Type' : 'application/json'
			}
		}



	})

		.config(function ($routeProvider) {

		$routeProvider.when('/', {
			templateUrl: 'scripts/posts/listPosts.tpl.html',
			controller: 'PostsController'
		})

		.when('/add', {
			templateUrl: 'scripts/posts/addPost.tpl.html',
			controller: 'PostsController',
		})

		.when('/edit', {
			templateUrl: 'scripts/posts/editPost.tpl.html',
			controller: 'PostsController'

		})

	})



}());
;(function (){

  angular.module('Posts')

    .controller('PostsController', ['$scope', 'PostsFactory', '$rootScope', '$location',

      function ($scope, PostsFactory, $rootScope, $location) {

         PostsFactory.retrieve().success( function (data) {
          $scope.allPosts = data.results;
          // console.log('in retrieve');
          // console.log(data.results);
        }),

         $scope.updatePosts = function (p) {
          PostsFactory.update(p);
          console.log('inupdate');
         },

         $scope.editPosts = function (p) {
          PostsFactory.edit(p);
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