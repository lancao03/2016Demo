//基本图文组件对象

var H5ComponentBase = function(name, cfg) {
	var cfg = cfg || {}; //没有参数时保持空对象
	var id = ("h5_c_" + Math.random()).replace(".", "_");

	//	把当前的组件类型添加到样式中进行标记
	var cls_base = "h5_component_" + cfg.type;
	var cls = cls_base + " h5_component_name_" + name;
	var component = $("<div class='h5_component " + cls + "' id='" + id + "' > ");

	//如果cfg的text有参数则把参数写入cfg 
	//&&  是逻辑运算符，符号左、右，均为 true ，结果才为 true。否则为 false
	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width / 2);
	cfg.height && component.height(cfg.height / 2);
	cfg.css && component.css(cfg.css);
	cfg.bg && component.css("backgroundImage", "url(" + cfg.bg + ")");
	if(cfg.center === true) {
		component.css({
			marginLeft: (cfg.width / 4 * -1) + "px",
			left: "50%"
		});
	}

	//debugger;
	component.on("onLoad", function() {
		console.log("加载了");
		//debugger;
		component.addClass(cls_base + "_load").removeClass(cls_base + "_leave");
		//动画效果
		cfg.animateIn && component.animate(cfg.animateIn);
		return false;
	});
	component.on("onLeave", function() {
		console.log("离开了");
		component.addClass(cls_base + "_leave").removeClass(cls_base + "_load");
		cfg.animateOut && component.animate(cfg.animateOut);
		return false;
	});
	return component;
}