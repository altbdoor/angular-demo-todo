angular.module('todoApp.about', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/about', {
		templateUrl: 'about/about.html',
		controller: 'aboutController'
	}).otherwise({
		redirectTo: '/home'
	});
}])

.controller('aboutController', [
	'TaskService', '$location',
	function (Task, $location) {
		var self = this;
		
		self.taskCount = Task.get().length;
		
		self.empty = function () {
			Task.empty();
			Task.touch();
			
			self.taskCount = Task.get().length;
		};
	}
]);
