angular.module('todoApp.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'homeController'
	}).otherwise({
		redirectTo: '/home'
	});
}])

.controller('homeController', [
	'TaskService', '$location',
	function (Task, $location) {
		var self = this;
		
		self.taskList = Task.get();
		
		self.addTask = function (form) {
			if (form.input && form.input.title != '') {
				var taskClone = Task.clone();
				
				taskClone.title = form.input.title;
				form.input.title = '';
				
				Task.add(taskClone);
				Task.touch();
			}
		};
		
		self.removeTask = function (item) {
			Task.remove(item);
			Task.touch();
		};
		
		self.editTask = function (item) {
			$location.path('/edit/' + item.created);
		};
	}
]);
