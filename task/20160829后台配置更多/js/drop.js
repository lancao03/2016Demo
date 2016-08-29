
function dropDown() {
	//字典格式 cfg
	this.cfg = {
		parentClass:"conf_show_more_w",
		btns:["title":"禁用","title":"日志"],
	}
}

dropDown.prototype = {
	drop: function(cfg) {
		//jquery的extend方法 比较合并
		var CFG = $.extend(this.cfg, cfg);
		var _this=$(this);
		
		var conf_show_more_w=_this.parents(".conf_show_more_w");
		
	}
}

;
(function($) {
	//定义菜单
	var $parent = $(".conf_show_more_w");

	var Dropdown = function() {

	}

	Dropdown.prototype.toggle = function(e) {
		var _this = $(this);
		if(_this.is('.disabled, :disabled')) return

		var isActive = $parent.hasClass('current');
		if(!isActive) {
			$parent.addClass("current");
		} else {
			$parent.removeClass("current");
		}
	}

	//清除菜单
	function clearMenu() {

	}

	//
	function getParent() {

	}
})(jquery);