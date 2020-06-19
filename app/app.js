var mgodapp = angular.module('mgodapp', [
	'ngRoute',
	'ngAnimate'
])

mgodapp.config([
	'$routeProvider',
	// '$locationProvider',
	function($routeProvider /*, $locationProvider*/){
		// $locationProvider.html5Mode(true)
		// route to home
		$routeProvider
			.when('/home', {
				templateUrl : './views/home.html',
				controller  : 'godController'
			})
			// route to list
			.when('/contact', {
				templateUrl : './views/contact.html',
				controller  : 'contactController'
			})
			.when('/list', {
				templateUrl : './views/list.html',
				controller  : 'godController'
			})
			.when('/contact-success', {
				templateUrl : './views/contact-success.html'
				//controller  : 'godController'
			})
			.otherwise({
				redirectTo : '/home'
			})
	}
])

mgodapp.directive('randomVal', [
	function(){
		return {
			restrict    : 'E',
			scope       : {
				gods  : '=',
				title : '='
			},
			templateUrl : './views/card.html', //'<h3>{{gods[random].name}}<h3>',
			transclude  : true,
			replace     : true,
			controller  : function($scope){
				$scope.random = Math.floor(
					Math.random() * 4
				)
			}
		}
	}
])

mgodapp.run(function(){})
mgodapp.controller('godController', [
	'$scope',
	'$http',
	function($scope, $http){
		// $scope.message = 'be the god'
		$scope.removeg = function(g){
			var rg = $scope.god.indexOf(g)
			$scope.god.splice(rg, 1)
		}
		$scope.addToList = function(){
			$scope.god.push({
				name      : $scope.newg.name,
				date      : $scope.newg.date,
				detail    : $scope.newg.detail,
				available : true
			})
			$scope.newg.name = ''
			$scope.newg.date = ''
			$scope.newg.detail = ''
		}

		$scope.removeAll = function(){
			$scope.god = []
		}

		$http.get('data/data.json').then(function(response){
			$scope.god = response.data
		})
	}
])

mgodapp.controller('contactController', [
	'$scope',
	'$location',
	function($scope, $location){
		$scope.sendMessage = function(){
			$location.path('/contact-success')
		}
	}
])
