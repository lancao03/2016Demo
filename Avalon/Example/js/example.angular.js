//Angular module方法 模块的名字 模块的依赖关系
//$scope 匿名函数（形参$scope ） 申明式的依赖注入
angular.module('todoApp',[]).controller('todos',['$scope',function($scope){
	$scope.todolist=[];
	$scope.add=function(e){
		e.preventDefault();
		console.log('111');
		$scope.todolist.push($scope.txt);
		$scope.txt='';
	}
}]);//控制器
//双向数据绑定 观察者模式




