### 20160827
## 课程安排

面向用户：面向对象开发基础 JS作用域 this 指针
DOM结构编写，CSS样式初始化，JS+JQ搭建基础开发结构，分析需要执行操作的DOM节点，位置关系的分析，左右旋转函数的编写

//初始结构
;(function($){
	var Carousel=function(poster){
	}
	Carousel.prototype={
		
	};
	
	//暴露出来 window上全局注册
	window["Carousel"]=Carousel;
	

})(jQuery);
//闭包 匿名函数自执行 jQuery 传进来 用$
