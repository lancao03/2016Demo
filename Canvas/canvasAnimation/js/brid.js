//小鸟动画
var bridObj = function() {
	this.x;
	this.y;

	this.picNo;
	this.timer;
}

bridObj.prototype.init = function() {
	this.x = 200;
	this.y = 200;
	this.picNo = Math.round(Math.random() * 9);
	this.timer = 0;
}

bridObj.prototype.update = function() {
	this.timer += deltaTime;
	if(this.timer > 500) {
		this.picNo += 1;
		this.picNo %= 7;
		this.timer = 0;
	}
}

bridObj.prototype.draw = function() {
	//drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
	ctx.drawImage(bridPic, this.picNo * 9, 0, 60, 82, this.x, this.y, 60, 82);
}

function drawBrid() {
	brids.update();
	brids.draw();
}