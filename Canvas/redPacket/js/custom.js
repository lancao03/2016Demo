$(function() {
	var canvasWidth = 750;
	var canvasHeight = 486;

	canvasWidth = canvasWidth;
	canvasHeight = canvasHeight;

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	var img = new Image();
	var radius = 30;
	var clippingRegion = {
		x: 400,
		y: 200,
		r: radius
	};
	img.src = "img/美女.jpg";
	img.onload = function(e) {
		initCanvas();
	};
	//创建剪辑区域
	function setClippingRegion(clippingRegion) {
		context.beginPath();
		context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, 2 * Math.PI);
		context.clip();
	}

	//初始化 canvas
	function initCanvas() {
		clippingRegion = {
			x: Math.random() * (canvas.width - radius * 2) + radius,
			y: Math.random() * (canvas.height - radius * 2) + radius,
			r: 50
		};
		draw(img, clippingRegion);
	}

	//绘图
	function draw(img, clippingRegion) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.save();
		setClippingRegion(clippingRegion);
		context.drawImage(img, 0, 0);
		context.restore();
	}

	var theAnimate;
	//显示图片
	$(".btn-show").on("click", function() {
		theAnimate = setInterval(function() {
			clippingRegion.r += 20;
			if(clippingRegion.r > 2 * Math.max(canvas.width, canvas.height)) {
				clearInterval(theAnimate);
			}
			draw(img, clippingRegion);
		}, 30);
	});
	//重置剪辑区
	$(".btn-reset").on("click", function() {
		clearInterval(theAnimate);
		initCanvas();
	});
});