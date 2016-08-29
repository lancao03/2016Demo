(function() {
	//html5本地存储
	var Util = (function() {
		var prefix = "html5_reader_";
		//防止别人误操作localstorage
		var StorageGetter = function(key) {
			return localStorage.getItem(prefix + key);
		}
		var StorageSetter = function(key, val) {
			return localStorage.setItem(prefix + key, val);
		}
		var getBSONP = function(url, callback) {
			return $.json({
				url: url,
				cache: true,
				callback: 'doukan_fiction_chapter',
				success: function(result) {
					var data = $.baseVal4.decode(result);
					var json = decodeURLComponent(escape(data));
					callback(data);
				}
			})
		}
		return {
			getBSONP: getBSONP,
			StorageGetter: StorageGetter,
			StorageSetter: StorageSetter
		}
	})(); //封装一个方法
	//声明一些常量
	var Dom = {
		top_nav: $("#top-nav"),
		bottom_nav: $(".bottom_nav"),
		night_day_switch: $("#night-button"),
		font_container: $(".font_container"),
		font_button: $("#font-button")
	}
	var Win = $(window);
	var Doc = $(document);
	var RootContainer = $("#fiction_container");
	//var initFontSize = 14; //初始字号
	var initFontSize = Util.StorageGetter("font-size");
	initFontSize = parseInt(initFontSize);
	if(!initFontSize) {
		initFontSize = 14;
	}
	RootContainer.css("font-size", initFontSize);

	//var initBackgroundColor="#f7eee5";
	var initBackgroundColor = Util.StorageGetter("background-color");
	RootContainer.css("background-color", initBackgroundColor);
	$(".bk-container[data-color='" + initBackgroundColor + "']").addClass("current");
	//console.log(initBackgroundColor,"值");
	if(!initBackgroundColor) {
		initBackgroundColor = "#f7eee5";
	}

	function main() {
		//todo 整个项目的入口函数
		EventHanlder();
	}
	var Chapter_id; //局部变量
	var init=function(){}
	function ReaderModel() {
		//todo 实现和阅读器相关的数据交互的方法	
		var getFictionInfo = function(callback) {
				$.get('/data/chapter.json', function(data) {
					// TODO 获得章节信息之后的回调
					Chapter_id=data.chapters[0].chapter_id;
					callback && callback();
				}, 'json');
			}
			//获得章节的内容
		var getCurChapterContent = function(chapter_id, data) {
			$.get('data/data' + chapter_id + '.json', function(data) {
				if(data.result == 0) {
					var url = data.jsonp;
					Util.getBSONP(URL, function(data) {
						callback && callback(data);
					})
				}
			})
		}

	}

	function ReaderBaseFrame() {
		//todo 渲染基本的UI结构
	}
	//控制层
	function EventHanlder() {
		//todo 交互的事件绑定
		//touch zepto tap  4.0 300ms
		$("#action_mid").click(function() {
			if(Dom.top_nav.css("display") == "none") {
				Dom.bottom_nav.show();
				Dom.top_nav.show();
			} else {
				Dom.bottom_nav.hide();
				Dom.top_nav.hide();
				Dom.font_container.hide();
				Dom.font_button.removeClass("current");
			}
		});
		Dom.font_button.click(function() {
			if(Dom.font_container.css("display") == "none") {
				Dom.font_container.show();
				Dom.font_button.addClass("current");
			} else {
				Dom.font_container.hide();
				Dom.font_button.removeClass("current");
			}
		});

		//字体变大
		$("#large-font").click(function() {
			initFontSize++;
			if(initFontSize > 20) {
				return;
			}
			RootContainer.css("font-size", initFontSize);
			Util.StorageSetter("font-size", initFontSize);
		});
		//字体变小
		$("#small-font").click(function() {
			initFontSize--;
			if(initFontSize < 12) {
				return;
			}
			RootContainer.css("font-size", initFontSize);
			Util.StorageSetter("font-size", initFontSize);
		});
		//背景色改变
		$(".bk-container").each(function() {
			$(this).click(function() {
				var curColor = $(this).attr("data-color");
				RootContainer.css("background-color", curColor);
				$(".bk-container").removeClass("current");
				$(this).addClass("current");
				Util.StorageSetter("background-color", curColor);
			});
		});

		Dom.night_day_switch.click(function() {
			//todo 触发背景切换事件
			var night_color = "rgba(0,0,0,0.3)";
			RootContainer.css("background", night_color);
			$(this).hide();
			$("#day-button").show();

		});

		Win.scroll(function() {
			Dom.bottom_nav.hide();
			Dom.top_nav.hide();
			Dom.font_container.hide();
			Dom.font_button.removeClass("current");
		});
	}

	main();

})();