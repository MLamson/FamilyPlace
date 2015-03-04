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