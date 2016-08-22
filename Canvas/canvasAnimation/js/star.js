var starObj = function() {
		this.x;
		this.y; //坐标

		this.picNo;
		this.timer; //时间间隔
	}
	//初始化
starObj.prototype.init = function() {
	this.x = Math.random() * 600 + 100;
	this.y = Math.random() * 300 + 150;
	this.picNo = Math.floor(Math.random() * 7);//归一 0.3 0.5>>0
	this.timer = 0;
}

starObj.prototype.update = function() {
	this.timer += deltaTime;
	if(this.timer > 500) {
		this.picNo += 1;
		this.picNo %= 7;
		this.timer = 0;
	}
	//	this.picNo += 1;
	//	if(this.picNo >= 7) {
	//		this.picNo = 0;
	//	}
}

//绘制方法
starObj.prototype.draw = function() {
		//drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
		ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
	}
	//定义一个星星的类
	//和星星绘制有关
	//function drawStar(){
	//	ctx.drawImage(starPic,100,100);
	//}

function drawStars() {
	for(var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();

	}
}