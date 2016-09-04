;
(function($) {
	var Carousel = function(poster) {
		//保存单个旋转木马
		this.poster = poster;
		this.posterItemMain = poster.find(".poster-list");
		this.nextBtn = poster.find('div.poster-next-btn');
		this.prevBtn = poster.find('div.poster-prev-btn');
		//幻灯片的个数
		this.posterItems = poster.find('li.poster-item');
		//第一帧
		this.posterFirstItem = this.posterItems.eq(0);

		//默认配置参数
		this.setting = {
				width: 1001, //幻灯片的宽度
				height: 270, //幻灯片的高度
				posterWidth: 640, //幻灯片第一帧的宽度
				posterHeight: 270, //幻灯片第一帧的高度
				scale: 0.9, //记录显示比例关系
				speed: 500,
				bbb: "222",
				verticalAlign: 'middle'
			}
			//扩展
		$.extend(this.setting, this.getSetting());
		this.setSettingValue();
		this.setPosterPos();
	}
	Carousel.prototype = {
		//设置剩余帧的位置关系
		setPosterPos: function() {
			var self = this;
			//定义一些变量 保存一些参数
			//保存剩余帧
			var sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size() / 2,
				rightSlice = sliceItems.slice(0, sliceSize),
				leftSlice = sliceItems.slice(sliceSize),
				level = Math.floor(this.posterItems.size() / 2);

			console.log(leftSlice);
			//保存第一帧的宽度高度
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width - this.setting.posterWidth) / 2) / level;

			//获取第一帧的值
			var firstLeft = (this.setting.width - this.setting.posterWidth) / 2;
			var fixOffsetLeft = firstLeft + rw;
			//设置右边帧的位置关系和宽度高度 top
			rightSlice.each(function(i) {
				level--;
				rw = rw * self.setting.scale;
				rh = rh * self.setting.scale;
				var j = i;
				$(this).css({
					zIndex: level,
					width: rw,
					height: rh,
					opacity: 1 / (++i),
					left: fixOffsetLeft + (++j) * gap - rw,
					top: (self.setting.posterHeight - rh) / 2
				});
			});

			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				oloop=Math.floor(this.posterItems.size()/2);
			//设置左边帧的位置关系 宽度 高度 top值
			leftSlice.each(function(i) {
				
				$(this).css({
					zIndex: level,
					width: lw,
					height: lh,
					opacity: 1 / oloop,
					left:i*gap,
					top: (self.setting.posterHeight - lh) / 2
				});
				lw=lw/self.setting.scale;
				lh=lh/self.setting.scale;
				oloop--;
			});
		},
		//设置配置参数值去控制基本的宽度 高度
		setSettingValue: function() {
			this.poster.css({
				width: this.setting.width,
				height: this.setting.height
			});
			this.posterItemMain.css({
				width: this.setting.width,
				height: this.setting.height
			});
			//计算上下切换按钮的宽度
			var w = (this.setting.width - this.setting.posterWidth) / 2;
			this.prevBtn.css({
				width: w,
				height: this.setting.height,
				zIndex: Math.floor(this.posterItems.size() / 2)
			});
			this.nextBtn.css({
				width: w,
				height: this.setting.height,
				zIndex: Math.floor(this.posterItems.size() / 2)
			})

			this.posterFirstItem.css({
				width: this.setting.posterWidth,
				height: this.setting.posterHeight,
				left: w,
				zIndex: Math.floor(this.posterItems.size() / 2)
			})

		},

		//获取自定义的配置参数
		getSetting: function() {
			var setting = this.poster.attr('data-setting');
			//转换为json对象
			//			$.parseJSON(setting);
			//容错
			if(setting && setting != "") {
				return $.parseJSON(setting);
			} else {
				return {}
			}
		},
		
		//设置对齐方式
		setAlign:function(height){
			var alignType=this.setting.verticalAlign,top:0;
			if()
		}
		

	};

	//暴露出来 window上全局注册
	window["Carousel"] = Carousel;
	//初始化函数 遍历新建对象
	Carousel.init = function(posters) {
		var _this_ = this;
		posters.each(function() {
			new _this_($(this));
		})
	}

})(jQuery);
//闭包 匿名函数自执行 jQuery 传进来 用$