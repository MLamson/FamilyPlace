;(function (){

	angular.module('Family', ['ngRoute'])

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
			controller: 'postsController'
		})

		.when('/add', {
			templateUrl: 'scripts/posts/addPosts.tpl.html',
			controller: 'postsController'

		})

	})

}()); 