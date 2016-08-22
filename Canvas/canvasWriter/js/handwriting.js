var canvasWidth = 500;
var canvasHeight = canvasWidth;
var isMouseDown=false;//检测鼠标是否按下
var lastLoc={x:0,y:0};//上一次鼠标的位置
var lastTimestamp=0;//记录上一次鼠标运动的时间戳

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
drawGrid();
canvas.onmousedown=function(e){
	e.preventDefault();
	isMouseDown=true;
	lastLoc=windowToCanvas(e.clientX,e.clientY);
	lastTimestamp=new Date().getTime();
//	console.log(lastTimestamp);
}
canvas.onmouseup=function(e){
	e.preventDefault();
	isMouseDown=false;
}
canvas.onmouseout=function(e){
	e.preventDefault();
	isMouseDown=false;
}
canvas.onmousemove=function(e){
	e.preventDefault();
	if(isMouseDown){
		//draw
		var curLoc=windowToCanvas(e.clientX,e.clientY);
		var curTimestamp=new Date().getTime();
		var s=calcDistance(curLoc,lastLoc);//计算运行的距离
		var t=curTimestamp-lastTimestamp;
		console.log(s);
		
		var lineWith=calcLineWidth(t,s);
		
		context.beginPath();
		context.moveTo(lastLoc.x,lastLoc.y);
		context.lineTo(curLoc.x,curLoc.y);
		
		context.strokeStyle="black";
		context.lineWidth=lineWith;
		context.lineCap="round";//帽子
		context.lineJoin="round";
		context.stroke();
		
		lastLoc=curLoc;
		lastTimestamp=curTimestamp;
//		console.log("mouse move");
	}
}

//笔画粗细 和运行速度有关
function calcLineWidth(t,s){
	var v=s/t;
	var resultLineWidth;
	if(v<=0.1){
		resultLineWidth=30;
	}else if(v>=10){
		resultLineWidth=1;
	}
	else{
		resultLineWidth=30-(v-0.1)/(10-0.1)*(30-1);
	}
	console.log(v,resultLineWidth);
	return resultLineWidth;
}

//计算运行距离
function calcDistance(loc1,loc2){
	return Math.sqrt(10*10+10*10);
//	return Math.sqrt((loc2.x-loc1.x)*(loc1.x-length.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}

//坐标系转换
function windowToCanvas(x,y){
	var bbox=canvas.getBoundingClientRect();
	//返回一个自定义的对象 坐标轴
	return {
		x:Math.round(x-bbox.left),
		y:Math.round(y-bbox.top)
	}
}
//绘制米子格
function drawGrid() {
	context.save();
	context.strokeStyle = "rgb(230,11,9)";
	
	context.beginPath();
	context.moveTo(3, 3);
	context.lineTo(canvas.width-3, 3);
	context.lineTo(canvas.width-3,canvasHeight-3);
	context.lineTo(3,canvas.height-3);
	context.closePath();
	
	context.lineWidth = 6;
	context.stroke();
	
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(canvas.width,canvas.height);
	
	context.moveTo(canvas.width/2,0);
	context.lineTo(canvas.width/2,canvas.height);
	
	context.moveTo(canvas.width,0);
	context.lineTo(0,canvas.height);
	
	context.moveTo(canvasWidth,canvasHeight/2)
	context.lineTo(0,canvasHeight/2);
	
	
	context.lineWidth=1;
	context.stroke();
	context.restore();
}