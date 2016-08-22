var can;
var ctx;
var w;
var h;
var girlPic = new Image();
var starPic = new Image();
var bridPic = new Image();

var num = 60; //星星的数量
var stars = []; //星星对象

var lastTime;
var deltaTime; //时间间隔

function init() {
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");
	w = can.width;
	h = can.height;

	girlPic.src = "../20160731 Canvas星星闪烁/images/girl.jpg";
	starPic.src = "../20160731 Canvas星星闪烁/images/star.png";

	for(var i = 0; i < num; i++) {
		//		stars[i] = new starObj();
		//		stars[i].init();
		var obj = new starObj();
		stars.push(obj);
		stars[i].init();
	}

	lastTime = Date.now();
	gameloop();

}

function gameloop() {
	window.requestAnimationFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	drawBackground(); //绘制背景
	drawGirl(); //绘制女孩
	drawStars(); //绘制星星
	//	drawStar();
}

//绘制背景
function drawBackground() {
	ctx.fillStyle = "#393550";
	ctx.fillRect(0, 0, w, h);

}

//绘制女孩图片
function drawGirl() {
	//drawImage(img,x,y)
	ctx.drawImage(girlPic, 100, 150, 600, 300);
}

document.body.onload = init();