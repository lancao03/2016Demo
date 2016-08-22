//内容管理对象
var H5 = function() {
	this.id = ("h5_" + Math.random()).replace(".", "_");
	this.el = $("<div class='h5' id='" + this.id + "'>").hide();
	this.page = [];
	$("body").append(this.el);
	var i = 0,
		j = 0;

	//新增一个页
	//name 组件的名称,会加入到ClassName中
	//text 页内的默认文本
	//HTMLAppletElement对象 可以重复使用H5对象支持的方法
	this.addPage = function(name, text) {
		var page = $("<div class='h5_page section'>");
		if (name != undefined) {
			page.addClass("H5_page_" + name);
		}
		if (text != undefined) {
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);
//		console.log("第" + i + "次加载页面", this);
		i++;
		return this;
	}

	//新增一个组件
	this.addComponent = function(name, cfg) {
			var cfg = cfg || {};
			cfg = $.extend({
				type: "base"
			}, cfg);
			var component; //定义一个变量，存储组件元素
			//debugger;
			var page = this.page.slice(-1)[0]; //slice() 方法可从已有的数组中返回选定的元素。
			switch (cfg.type) {
				case "base":
					component = new H5ComponentBase(name, cfg);
					break;
				default:
			}
			page.append(component);
			return this;
		}
		//	H5对象的初始化呈现
	this.loader = function() {
//		console.log("加载",this.el);
		var that=this.el;
		window.that=that;
		this.el.show();
		this.el.fullpage({
			onLeave: function(index, nextIndex, direction) {
				$(that).find(".h5_component").trigger("onLeave");
				console.log($(that),$(that).find(".h5_component_base"));
			},
			afterLoad: function(anchorLink, index) {
				$(that).find('.h5_component').trigger('onLoad');
			}
		});
		
	}
	return this;
}