(function() {
	var Dropdown = function(obj) {
		//定义属性用this 查找元素 obj
		//obj 为conf_show_more_w J_btn_wrap

		var self = this;

		this.wrap = obj;
		
		this.isActive = false;
		this.btn_txt = obj.find(".btn_txt");

		this.conf_drop_op = obj.siblings(".conf_drop_op");
		this._class = obj.prop("className");

		var w_wrap = this.wrap.width();
		this.conf_drop_op.width(w_wrap);

	}

	Dropdown.prototype = {
		toggle: function() {
			this.isActive = this.wrap.hasClass("current");
			if(this.isActive) {
				this.removeMenu();
				this._class = this.wrap.prop("className");
			} else {
				this.wrap.addClass("current");
				this.isActive = true;
				this._class = this.wrap.prop("className");
			}
			console.log("点击", this.isActive);
		},
		removeMenu: function() {
			this.isActive = this.wrap.hasClass("current");
			this.wrap.removeClass("current");
			this.isActive = false;
			console.log("去除菜单", this.isActive);
		},
		setOptions: function() {
			if(this.btn_txt.size() > 2) {
				
				var more_btn=this.wrap.find(".conf_btn_more");
				//this.toggle(); //切换显示与隐藏
				obj.click(function(e) {
					e.stopPropagation(); //阻止冒泡事件
					self.toggle();
				});

				this.conf_drop_op.find("li").click(function(e) {
					e.stopPropagation();
					self.removeMenu();
				});

				$(document).on("click", function(e) { //点击其他地方收起下拉框
					if(self.isActive) {
						self.removeMenu();
					}
					console.log("点击了其他地方", self.isActive);
				});
			}
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