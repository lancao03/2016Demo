var chess = document.getElementById("chess");
var context = chess.getContext("2d");
var me=true;
var chessBoard=[];//用一个数组存储棋盘

for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;//没有落子为0
	}
}

context.strokeStyle = "#bfbfbf";

var logo = new Image();
logo.src = "img/head.jpg";
logo.onload = function() {
//	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();

//	context.beginPath();
//	context.arc(200, 200, 100, 0, 2 * Math.PI);
//	context.closePath();
//	var gradient = context.createRadialGradient(200, 200, 50, 200, 200, 20);
//	gradient.addColorStop(0, "#0a0a0a");
//	gradient.addColorStop(1, "#636766");
//	context.fillStyle = gradient;

	onestep(0,0,true);//黑棋
	onestep(1,2,false);//白棋
 }

//绘制棋盘
var drawChessBoard = function() {
	for (var i = 0; i < 15; i++) {
		context.moveTo(15 + 30 * i, 15);
		context.lineTo(15 + 30 * i, 435);
		context.stroke();

		context.moveTo(15, 15 + 30 * i);
		context.lineTo(435, 15 + 30 * i);
		context.stroke();
	}
}

//绘制棋子函数
var onestep = function(i, j, me) {
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if (me) {
		gradient.addColorStop(0, "#0a0a0a");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#d1d1d1");
		gradient.addColorStop(1, "#f9f9f9");
	}
	context.fillStyle = gradient;
	context.fill();

}

var count=1;//用于计算点击了多少次
//落子
chess.onclick=function(e){
	var x=e.offsetX;//X轴坐标
	var y=e.offsetY;//Y轴坐标
	var i=Math.floor(x/30);//向下取整
	var j=Math.floor(y/30);
	
	//防止重复下棋
	if(chessBoard[i][j]==0){
	onestep(i,j,me);
	if(me){
		chessBoard[i][j]=1;
	}else{
		chessBoard[i][j]=2;
	}
	
	var chessColor=me?"黑子":"白子";
	console.log("第"+count+"次下子,下子的位置X轴上"+x+" Y轴上"+y+"。第"+i+"列，第"+j+"排下了一颗"+chessColor);
	count++;
	
	me=!me;
	
	}
	
}

//context.moveTo(15,0);
//context.lineTo(15,450);
//context.stroke();