(function(){
	var $todoFrom=$('#todoFrom');
	var $todoInput=$('#todoInput');//文本域对象
	var $todoList=$('#todoList');//todolist对象
	var $todoCount=$('#todoCount');
	
	function count(){
		var len=$todoList.children().length;
		$todoCount.html(len>0?'现有'+len+'项todo list':'');
	}
	
	$todoFrom.submit(function(e){
		var input_value=$todoInput.val();//文本域内容
		$todoList.append('<li>'+input_value+'&nbsp;<a class="todoDelete">X</a></li>');
		$todoInput.val('');
		e.preventDefault();
		count();
	});
	
	$todoList.on('click','.todoDelete',function(e){
		$(this).parent().remove();
		count();
	})
	//为了不污染全局变量，定义一个立即执行的函数表达式
	//为表单绑定submit事件；输入内容回车出发 2、触发后的ol list事件装填；3、为list条目删除绑定事件；4、定义click事件触发以后的当前这个条目的删除；5、条目的更新
})();
