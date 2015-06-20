angular.module('todoApp.edit', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/edit/:created', {
		templateUrl: 'edit/edit.html',
		controller: 'editController'
	}).otherwise({
		redirectTo: '/home'
	});
}])

.controller('editController', [
	'TaskService', '$location', '$routeParams',
	function (Task, $location, $routeParams) {
		var self = this,
			created = $routeParams.created;
		
		if (created != '') {
			self.task = {};
			
			angular.forEach(Task.get(), function (val, key) {
				if (val.created == created) {
					angular.copy(val, self.task);
				}
			});
		}
		else {
			$location.path('/home');
		}
		
		self.saveTask = function () {
			angular.forEach(Task.get(), function (val, key) {
				if (val.created == self.task.created) {
					angular.copy(self.task, val);
				}
			});
			
			Task.touch();
			$location.path('/home');
		};
	}
]);
