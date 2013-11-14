'use strict';

var demoApp = angular.module('appModule', [ 'ngResource', 'ngCookies', 'ui.router', 'fdServices', 'nthsControllers' ]);

demoApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/");
	
	$stateProvider.state('public', {
		templateUrl : 'views/layout/public.html'
	}).state('public.home', {
		url : '/',
		templateUrl : 'views/public/home.html'
	}).state('public.products', {
		url : '/products',
		templateUrl : 'views/public/products.html'
	}).state('public.login', {
		url : '/login',
		controller : 'LoginCtrl',
		templateUrl : 'views/public/login.html'
	}).state('admin', {
		templateUrl : 'views/layout/admin.html'
	}).state('admin.settings', {
		url : "/settings",
		templateUrl : 'views/admin/settings.html'
	}).state('admin.messages', {
		url : '/messages',
		controller : 'MessageCtrl',
		templateUrl : "views/admin/message/list.html"
	}).state('admin.users', {
		url : '/users',
		controller : 'UserCtrl',
		templateUrl : 'views/user/list.html'
	}).state('admin.user', {
		url : '/user',
		controller : 'AddUserCtrl',
		templateUrl : 'views/user/detail.html'
	}).state('admin.user.id', {
		url : '/user/:id',
		controller : 'EditUserCtrl',
		templateUrl : 'views/user/detail.html'
	});
	
	$locationProvider.html5Mode(true);
});

demoApp.config(function($httpProvider) {

	var logsOutUserOn401 = function($location, $q, SessionService) {
		var success = function(response) {
			return response;
		};

		var error = function(response) {
			if (response.status === 401) {
				SessionService.unset('authenticated');
				$location.path('/login');
				return $q.reject(response);
			} else {
				return $q.reject(response);
			}
		};

		return function(promise) {
			return promise.then(success, error);
		};
	};

	$httpProvider.responseInterceptors.push(logsOutUserOn401);
});