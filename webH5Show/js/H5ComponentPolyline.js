/* 折线图图组件对象 */

var H5ComponentPolyline = function(name, cfg) {

	var component = new H5ComponentBase(name, cfg);

	//	绘制网格线
	var w = cfg.width;
	var h = cfg.height;
	//	加入一块画布（做网格）
	var cns = document.createElement("canvas");
	var ctx = cns.getContext("2d"); //画布对象
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	//水平网格线 100份->10份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#aaa";

	window.ctx = ctx; //ctx暴露到全局对象中来

	for(var i = 0; i < 10 + 1; i++) {
		var y = (h / step) * i;
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
		console.log("第", i, "次划水平网格线，起点(0,", y, ") 终点(", w, ",", y, ")");
	}
	ctx.stroke();

	//垂直网格线（根据项目的个数来分)
	step = cfg.data.length + 1;
	var text_w = w / step >> 0; // 文本的宽度  >>0剪掉小数
	for(var i = 0; i < step + 1; i++) {
		var x = (w / step) * i;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);

		//输入项目文本
		if(cfg.data[i]) {
			var text = $("<div class='text'>");
			text.text(cfg.data[i][0]);
			text.css("width", text_w / 2)
				.css("left", (x / 2 - text_w / 4) + text_w / 2);
		}
		component.append(text);
		console.log("第",
			i,
			"次划垂直网格线，起点(",
			x,
			",0)终点(",
			x,
			",", h, ")");
	}
	ctx.stroke();

	component.append(cns);

	//	加入画布 - 数据层
	var cns = document.createElement("canvas");
	var ctx = cns.getContext("2d");
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	//绘制折线以及对应的数据和阴影
	//pre 0-1之间的数据，会根据这个值绘制最终数据对应的中间状态
	//return Demo元素 Component
	var draw = function(per) {
			//清空画布
			ctx.clearRect(0, 0, w, h);
			//	绘制折线数据
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.strokeStyle = "#ff8878";

			var x = 0;
			var y = 0;

			step = cfg.data.length + 1;
			//测试画圆点
			//ctx.moveTo(10,10);
			//ctx.arc(10,10,5,0,2*Math.PI);
			//画点
			var row_w = (w / (cfg.data.length + 1));
			for(i in cfg.data) {
				var item = cfg.data[i];
				x = row_w * i + row_w;
				y = h - h * item[1] * per;

				ctx.moveTo(x, y);
				ctx.arc(x, y, 5, 0, 2 * Math.PI);
				console.log(x, item, "row_w的值", row_w);
			}
			//连线
			//移动画笔到第一个数据的点位置
			ctx.moveTo(row_w * 0 + row_w, (h - h * cfg.data[0][1] * per));
			//	ctx.arc(row_w, h * (1 - cfg.data[0][1]), 20, 0, 2 * Math.PI);
			for(i in cfg.data) {
				var item = cfg.data[i];
				x = row_w * i + row_w;
				y = (h - h * item[1] * per);
				ctx.lineTo(x, y);
			}
			//写数据
			for(i in cfg.data) {
				var item = cfg.data[i];
				x = row_w * i + row_w;
				y = (h - h * item[1] * per);
				//假如data中有颜色值 给划线赋值颜色
				ctx.fillStyle = item[2] ? item[2] : "#595959";
				ctx.fillText(((item[1] * 100) >> 0) + "%", x - 10, y - 10);
			}
			ctx.stroke();
			//	绘制阴影
			ctx.lineTo(x, h);
			ctx.lineTo(row_w, h);
			ctx.fillStyle = "rgba(255,118,118,0.2)";
			ctx.fill();
			console.log('画阴影的过程，第二点(', x + "," + h + ")第三点(", row_w + "," + h + ")");
		}
		//draw(0.8);
		//折线图的生长动画
	component.on("onLoad", function() {
		var s = 0;
		//递归动画
		for(var i = 0; i < 100; i++) {
			setTimeout(function() {
				s += .01;
				draw(s);
			}, i * 10+500);
			//闭包的写法 去执行一个函数而不是定义一个函数
		}
	});
	//折线图退场动画
	component.on("onLeave", function() {
		var s = 1;
		for(var i = 0; i < 100; i++) {
			setTimeout(function() {
				s -= .01;
				draw(s);
			}, i * 10+500)
		}
	});
	return component;
}