/* 雷达图组件对象 */

var H5ComponentRadar = function(name, cfg) {

	var component = new H5ComponentBase(name, cfg);

	//	绘制网格线
	var w = cfg.width;
	var h = cfg.height;
	//	加入一块画布（做网格）
	var cns = document.createElement("canvas");
	var ctx = cns.getContext("2d"); //画布对象
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	var r = w / 2;
	var step = cfg.data.length;

	ctx.beginPath();
	ctx.arc(r, r, 5, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(r, r, r, 0, 2 * Math.PI);
	ctx.stroke();

	//计算一个圆周上的坐标（计算多边形的顶点坐标）
	//已知：圆心坐标（a,b）、半径 r；角度 deg
	//rad=(2*Math.PI/360)*(360/step)*i
	//x=a+Math.sin(rad)*r;
	//y=b+Math.cos(rad)*r;

	//绘制网格背景（分面绘制，绘制十份）
	var isBlue = false;
	for(var s = 10; s > 0; s--) {
		ctx.beginPath();
		for(var i = 0; i < step; i++) {
			//弧度
			var rad = (2 * Math.PI / 360) * (360 / step) * i;
			var x = r + Math.sin(rad) * r * (s / 10);
			var y = r + Math.cos(rad) * r * (s / 10);

			ctx.lineTo(x, y);

		}
		ctx.closePath();
		//		debugger;
		ctx.fillStyle = (isBlue = !isBlue) ? "#99c0ff" : "#f1f9ff";
		ctx.fill();
	}

	//绘制伞骨
	for(var i = 0; i < step; i++) {
		var rad = (2 * Math.PI / 360) * (360 / step) * i;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		ctx.moveTo(r, r);
		ctx.lineTo(x, y);

		//输出项目文字
		var text = $("<div class='text'>");
		text.text(cfg.data[i][0]);
		//		text.css("left",x/2).css("top",y/2);
		//		text.css("top", y / 2);
		text.css("transition", "all .5s " + (i * .1) + "s").css("opacity",0);
		if(x > w / 2) {
			text.css("left", x / 2 + 5);
		} else {
			text.css("right", (w - x) / 2 + 5);
		}
		if(y > w / 2) {
			text.css("top", y / 2 + 5);
		} else {
			text.css("bottom", (h - y) / 2 + 5);
		}
		if(cfg.data[i][2]) {
			text.css("color", cfg.data[i][2]);
		}
		component.append(text);
	}
	ctx.strokeStyle = "#e0e0e0";
	ctx.stroke();

	//	ctx.beginPath();
	//	for(var i = 0; i < step; i++) {
	//		var rad = (2 * Math.PI / 360) * (360 / step) * i;
	//		var x = r + Math.sin(rad) * r;
	//		var y = r + Math.cos(rad) * r;
	//		console.log("rad的值是", rad, "x坐标的值是：", x, "y轴坐标的值是：", y);
	//		//		ctx.beginPath();
	//		//		ctx.arc(x,y,5,0,2*Math.PI);
	//		//		ctx.stroke();
	//		//		
	//		//		ctx.beginPath();
	//		//		ctx.moveTo(r,r);
	//		//		ctx.lineTo(x,y);
	//		//		ctx.stroke();
	//
	//		ctx.lineTo(x, y);
	//
	//	}
	//	ctx.closePath();
	//	ctx.fill();
	component.append(cns);

	var cns = document.createElement("canvas");
	var ctx = cns.getContext("2d");
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	ctx.strokeStyle = "#f00";
	var draw = function(per) {
		if(per<1){
			component.find(".text").css("opacity",0);
		}
		if(per >= 1) {
			component.find(".text").css("opacity", 1);
		}
		ctx.clearRect(0, 0, w, h);
		//绘制数据的折线
		for(var i = 0; i < step; i++) {
			var rad = (2 * Math.PI / 360) * (360 / step) * i;

			var rate = cfg.data[i][1] * per;

			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;

			ctx.lineTo(x, y);
			ctx.arc(x, y, 5, 0, 2 * Math.PI);
		}
		ctx.closePath();
		ctx.stroke();

		//绘制数据的点
		for(var i = 0; i < step; i++) {
			var rad = (2 * Math.PI / 360) * (360 / step) * i;

			var rate = cfg.data[i][1] * per;

			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;

			ctx.beginPath();
			ctx.arc(x, y, 5, 0, 2 * Math.PI);
			ctx.fillStyle = "#ff7676";
			ctx.fill();
		}
	}

	component.append(cns);
	component.on("onLoad", function() {
		var s = 0;
		for(var i = 0; i < 100; i++) {
			setTimeout(function() {
				s += .01;
				draw(s);
			}, i * 10);
		}
	});
	component.on("onLeave", function() {
		var s = 1;
		for(var i = 0; i < 100; i++) {
			setTimeout(function() {
				s -= .01;
				draw(s);
			}, i * 10);
		}
	});
	return component;
}