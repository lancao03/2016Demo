jQuery.fn.extend({
	dropdown: function(e) {
		return this.each(function(i, obj) {
			var obj = $(this);

			var wrap = obj.parents(".conf_show_more_w");
			var w_wrap = wrap.width();
			var conf_drop_op = obj.siblings(".conf_drop_op");
			conf_drop_op.width(w_wrap);

			var _class = wrap.prop("className");
			var isActive = false;

			toggle(); //切换显示与隐藏

			conf_drop_op.find("li").on("click", function(e) {
				e.stopPropagation();
				removeMenu();
			});

			function toggle() {
				isActive = wrap.hasClass("current");
				if(isActive) {
					removeMenu();
					_class = wrap.prop("className");
				} else {
					wrap.addClass("current");
					isActive = true;
					_class = wrap.prop("className");
				}
			}

			function removeMenu() {
				isActive = wrap.hasClass("current");
				wrap.removeClass("current");
				isActive = false;
			}

			$(document).on("click", function(e) { //点击其他地方收起下拉框
				if(isActive) {
					removeMenu();
				}

			});
		});
	}
});;

$(document).ready(function() {
	$(".conf_btn_more").on("click", function(e) {
		e.stopPropagation(); //阻止冒泡事件
		$(this).dropdown();
	});
});