(function() {
	var Dropdown = function(obj) {
		//定义属性用this 查找元素 obj
		var self = this;
		this.obj= obj;
		this.t = null; //定时器
		this.wrap = this.obj.parents(".conf_show_more_w");
		this.conf_drop_op = this.obj.siblings(".conf_drop_op");

		var w_wrap = this.wrap.width();
		this.conf_drop_op.width(w_wrap);

		//this.toggle(); //切换显示与隐藏
		this.obj.mouseover(function(e) {
			self.toggle();
		});

		this.obj.mouseout(function(e) {
			self.removeMenu();
		});

		this.conf_drop_op.mouseover(function(e) {
			self.toggle();
		});

		this.conf_drop_op.mouseout(function(e) {
			self.removeMenu();
		});

		this.conf_drop_op.find("li").click(function(e) {
			e.stopPropagation();
			self.wrap.removeClass("current");
		});
	}

	Dropdown.prototype = {
		toggle: function() {
			clearTimeout(this.t);
			this.wrap.addClass("current");
		},
		removeMenu: function() {
			var that = this;
			that.t = setTimeout(function() {
				that.wrap.removeClass("current");
			}, 200);
		}
	}

	//初始化
	Dropdown.init = function(obj) {
		var _this_ = this;
		obj.each(function() {
			new _this_($(this));
		});
	};

	window["Dropdown"] = Dropdown;
})(jQuery);