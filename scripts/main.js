;(function (){
	
angular.module('Posts', ['ngRoute', 'ngCookies', 'User'])

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

		.config(['$routeProvider', function ($routeProvider) {

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
		.when('/register', {
      templateUrl: 'scripts/users/user.register.tpl.html',
      controller: 'UserCtrl'

    })
    .when('/login', {
      templateUrl: 'scripts/users/user.login.tpl.html',
      controller: 'UserCtrl'

    })

	}])



}());
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
;(function (){
  
  'use strict';

  angular.module('User', ['ngRoute', 'ngCookies'])

  .controller('UserCtrl', ['$scope', 'UserFactory', '$location', 

    function ($scope, UserFactory, $location) {

      // If Currently Logged in - Leave this controller
      var user = UserFactory.user();
      if (user) {
        return $location.path('/');
      }

      // Add a new user
      $scope.registerUser = function (userObj) {
        UserFactory.register(userObj);
      };

      // Login Method
      $scope.loginUser = function (userObj) {
        UserFactory.login(userObj);
      };
    
    }

  ]);

}());
;(function (){
  
  'use strict';

  angular.module('User')

  .factory('UserFactory', ['$http', 'PARSE', '$cookieStore', '$location',

    function ($http, PARSE, $cookieStore, $location) {
    
      // Get Current User
      var currentUser = function () {
        return $cookieStore.get('currentUser');
      };

      // Check User Status
      var checkLoginStatus = function () {
        var user = currentUser();
        if (user) {
          PARSE.CONFIG.headers['X-PARSE-Session-Token'] = user.sessionToken;
        }
      };

      // Add a new User
      var addUser = function (userObj) {
        $http.post(PARSE.URL + 'users', userObj, PARSE.CONFIG)
          .then( function (res) {
            console.log(res);
          }
        );
      };

      // Log in a User
      var loginUser = function (userObj) {

        $http({
          method: 'GET',
          url: PARSE.URL + 'login',
          headers: PARSE.CONFIG.headers,
          params: userObj
        }).then (function (res) {
          console.log(res);
          $cookieStore.put('currentUser', res.data);
        });
        
      };

      // Logout Method
      var logoutUser = function () {
        $cookieStore.remove('currentUser');
        $location.path('/login');
      }
  
      return {
        register : addUser, 
        login : loginUser,
        user : currentUser,
        status : checkLoginStatus,
        logout : logoutUser
      };

    }

  ]);

}());