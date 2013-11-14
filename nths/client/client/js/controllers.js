'use strict';

var nthsControllers = angular.module('nthsControllers', []);

///////////////// User Start///////////////////////
demoApp.controller('UserCtrl', function ($scope, $http, User) {
	$scope.users = User.query();
	$scope.selectUser = function(row) {
		$scope.selectedRow = row;
	};
	
	$scope.deleteUser = function(user, index) {
		user.$delete({id:user._id});
		$scope.users.splice(index, 1);
	};
});

demoApp.controller('AddUserCtrl', function($scope, $location, User) {
	
	$scope.saveUser = function() {
		User.save($scope.user, function() {
			$location.path('/users');
		});
	};
});

demoApp.controller('EditUserCtrl', function($scope, $location, $routeParams, User ) {

	$scope.user = User.get({
		id : $routeParams.id
	});
	
	$scope.saveUser = function() {
		$scope.user.$update();
		$location.path('/users');
	};
});

///////////////// Message Start///////////////////////

nthsControllers.controller('MessageCtrl', function ($scope, $http, Message) {

	Message.query().success(function(response,status){
		$scope.messages = response;
	});

//	$scope.selectMessage = function(row) {
//		$scope.selectedRow = row;
//	};
//	
//	$scope.deleteMessage = function(message, index) {
//		message.$delete({id:message._id});
//		$scope.messages.splice(index, 1);
//	};
});

demoApp.controller('AddMessageCtrl', function($scope, $location, Message) {
	
	$scope.saveMessage = function() {
		//dump($scope.message);
//		$scope.message.status = 'unread';
//		console.log('calling save message %j', $scope.message);
//		
		Message.save($scope.message, function() {
			//$location.path('/users');
		});
	};
});

//demoApp.controller('EditMessageCtrl', function($scope, $location, $routeParams, Message) {
//
//	$scope.message = Message.get({
//		id : $routeParams.id
//	});
//	
//	$scope.saveMessage = function() {
//		$scope.message.$update();
//	};
//});

///////////////// Other Start///////////////////////

demoApp.controller("NavCtrl", function($scope, $location, AuthenticationService) {
	$scope.logout = function() {
		AuthenticationService.logout().success(function() {
			$location.path('/');
			//$state.go('public.home');
		});
	};
});

demoApp.controller('LoginCtrl', function ($scope, $location, $cookieStore, AuthenticationService) {
	$scope.credentials = { username: "", password: ""};
	
	$scope.login = function() {
		AuthenticationService.login($scope.credentials).success(function() {
			$location.path('/messages');
			//$state.go('admin.messages');
		});
	};
	
});
