'use strict';

var fdServices = angular.module('fdServices', ['ngResource']);


//10.100.78.143
//var resourceRoot = 'http://192.168.1.109\\:3000';
//var httpRoot = 'http://192.168.1.109:3000';

var resourceRoot = 'http://localhost\\:3000';
var httpRoot = 'http://localhost:3000';

demoApp.factory('User', function($resource, SessionService) {
	var tokenid = SessionService.get('tid');
	return $resource(resourceRoot + '/api/user/:id', {id: '@id', tid: tokenid}, {
		update: {method:'PUT'}
	});
});

//demoApp.factory('Message', function($resource, SessionService) {
//	var tokenid = SessionService.get('tid');
//	return $resource(resourceRoot + '/api/message/:id', {id: '@id', tid: tokenid}), {
//		//update: {method:'PUT'},
//		save:{method:'POST', url: resourceRoot + '/public/message', data:}
//	});
//});

fdServices.factory('Message', function($http, SessionService){
	var tokenid = SessionService.get('tid');
	return {
		getById: function(id){
			return $http.get(httpRoot + '/api/message/:id', {params: {tid: tokenid}});
		},
		query: function(){
			return $http.get(httpRoot + '/api/message', {params: {tid: tokenid}});
		},
		save: function(message){
			return $http.post(httpRoot + '/public/login', message).
			success(function(response,status){
				if(status == 200){
					console.log('message saved: %j', response);
				}else{
					console.log('save error: %j', response);
				}
			}).
			error(function(response,status){
				console.log('save error: %j', response);
			});
		}
	}
});

fdServices.factory('AuthenticationService', function($http, 
		SessionService, FlashService) {
	var cacheSession = function(value) {
		SessionService.set('tid', value);
	};

	var uncacheSession = function() {
		SessionService.unset('tid');
	};

	var loginError = function(response) {
		FlashService.set(response.message);
	};

	return {
		login : function(credentials) {
			return $http.post(httpRoot + '/public/login', credentials).
			success(function(response,status){
				if(status == 200){
					cacheSession(response.tokenid);
					FlashService.clear();
				}else{
					loginError(response);
				}
			}).
			error(function(response,status){
				loginError(response);
			});
		},
		logout : function() {
			var tokenid = SessionService.get('tid');
			var logout = $http.get(httpRoot + '/api/logout',
					{params: {tid: tokenid}});
			logout.success(uncacheSession);
			return logout;
		},
		isLoggedIn : function() {
			return !(SessionService.get('tid') == null);
		}
	};
});

fdServices.factory('SessionService', function(){
	return {
		get: function(key){
			return sessionStorage.getItem(key);
		},
		set: function(key,value){
			return sessionStorage.setItem(key, value);
		},
		unset: function(key){
			return sessionStorage.removeItem(key);
		}
	};
});

fdServices.factory("FlashService", ['$rootScope', function($rootScope) {
	return {
		set: function(message) {
			$rootScope.flash = message;
		},
		clear: function() {
			$rootScope.flash = "";
		},
		get: function(){
			return $rootScope.flash;
		}
	}
}]);

fdServices.factory('PageService', function(){
	return {
		pageCount : function(itemCount, pageSize) {
			return Math.ceil(parseInt(itemCount) / parseInt(pageSize));
		},
		pageList : function(segment, pageCount) {
			var result = new Array(pageCount);
			for ( var i = 0; i < pageCount; i++) {
				result[i] = segment*10 + i;
			}
			return result;
		}
	};
});
demoApp.run(function($rootScope, $location, $state, AuthenticationService) {
	var publicRoutes = [ '/','/products', '/login' ];

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		//event.preventDefault(); 
		if (!_(publicRoutes).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
			$location.path('/login');
		}
	});
});