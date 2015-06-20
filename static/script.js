// https://github.com/pamelafox/lscache/
!function(n,e){"function"==typeof define&&define.amd?define([],e):"undefined"!=typeof module&&module.exports?module.exports=e():n.lscache=e()}(this,function(){function n(){var n="__lscachetest__",t=n;if(void 0!==d)return d;try{c(n,t),u(n),d=!0}catch(r){d=e(r)?!0:!1}return d}function e(n){return n&&"QUOTA_EXCEEDED_ERR"===n.name||"NS_ERROR_DOM_QUOTA_REACHED"===n.name||"QuotaExceededError"===n.name?!0:!1}function t(){return void 0===h&&(h=null!=window.JSON),h}function r(n){return n+g}function o(){return Math.floor((new Date).getTime()/v)}function i(n){return localStorage.getItem(p+y+n)}function c(n,e){localStorage.removeItem(p+y+n),localStorage.setItem(p+y+n,e)}function u(n){localStorage.removeItem(p+y+n)}function a(n){for(var e=new RegExp("^"+p+y+"(.*)"),t=localStorage.length-1;t>=0;--t){var o=localStorage.key(t);o=o&&o.match(e),o=o&&o[1],o&&o.indexOf(g)<0&&n(o,r(o))}}function f(n){var e=r(n);u(n),u(e)}function l(n){var e=r(n),t=i(e);if(t){var c=parseInt(t,m);if(o()>=c)return u(n),u(e),!0}}function s(n,e){E&&"console"in window&&"function"==typeof window.console.warn&&(window.console.warn("lscache - "+n),e&&window.console.warn("lscache - The error was: "+e.message))}var d,h,p="lscache-",g="-cacheexpiration",m=10,v=6e4,w=Math.floor(864e13/v),y="",E=!1,S={set:function(l,d,h){if(n()){if("string"!=typeof d){if(!t())return;try{d=JSON.stringify(d)}catch(p){return}}try{c(l,d)}catch(p){if(!e(p))return void s("Could not add item with key '"+l+"'",p);var g,v=[];a(function(n,e){var t=i(e);t=t?parseInt(t,m):w,v.push({key:n,size:(i(n)||"").length,expiration:t})}),v.sort(function(n,e){return e.expiration-n.expiration});for(var y=(d||"").length;v.length&&y>0;)g=v.pop(),s("Cache is full, removing item with key '"+l+"'"),f(g.key),y-=g.size;try{c(l,d)}catch(p){return void s("Could not add item with key '"+l+"', perhaps it's too big?",p)}}h?c(r(l),(o()+h).toString(m)):u(r(l))}},get:function(e){if(!n())return null;if(l(e))return null;var r=i(e);if(!r||!t())return r;try{return JSON.parse(r)}catch(o){return r}},remove:function(e){n()&&f(e)},supported:function(){return n()},flush:function(){n()&&a(function(n){f(n)})},flushExpired:function(){n()&&a(function(n){l(n)})},setBucket:function(n){y=n},resetBucket:function(){y=""},enableWarnings:function(n){E=n}};return S});

// init angular
angular.module('todoApp', [
	'ngRoute',
	
	'todoApp.home',
	'todoApp.edit',
	'todoApp.about'
])

// configure routes
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
}])

// configure task service
.factory('TaskService', function () {
	var taskList = [];
	
	if (lscache.get('todoapp-list')) {
		taskList = lscache.get('todoapp-list');
	}
	
	return {
		get: function () {
			return taskList;
		},
		add: function (item) {
			taskList.unshift(item);
		},
		remove: function (item) {
			var index = taskList.indexOf(item);
			
			if (index > -1) {
				taskList.splice(index, 1);
			}
		},
		touch: function () {
			lscache.set('todoapp-list', taskList);
		},
		empty: function () {
			taskList = [];
		},
		clone: function () {
			return {
				created: Date.now(),
				title: '',
				description: ''
			}
		}
	};
});

